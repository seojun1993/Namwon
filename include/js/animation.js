// assetsJson JS START
let assetsJson = new Array();
let personJson = new Array();
let personArr = []

let personLeft, personCenter, personRight;

$(function () {
    window.onload = () => {
        let startDelay = 1800000;
        AjaxCall();
    }

    function AjaxCall(a){
    $.ajax({
        type: 'GET',
        url : 'https://novus.run/smartluna/lunatree/list',
        contentType: 'application/json; charset=utf-8',
        
        success: function(data) {
            StartContent(data);
        },
        
        error: function(e) {
            var message = e?.responseJSON?.message;
        
            if(message) return alert(message);
        }
        });

        clearTimeout(AjaxCall, 3000);
    }
    
    function StartContent(data){
    $.getJSON("include/assets.json", function (res) {
        personJson = data;
        assetsJson = res;
    
        personLeft = personJson.slice(0, Math.floor(personJson.length * 0.2));
        personCenter = personJson.slice(Math.floor(personJson.length * 0.2), Math.floor(personJson.length * 0.8));
        personRight = personJson.slice(Math.floor(personJson.length * 0.8));

        console.log('left :', personLeft)
        console.log('center :', personCenter)
        console.log('right :', personRight)

        let html = '';
        let listIdx = 0;
        let addDelay = 3000;
        let changeDelay = 0;
        let startDelay = 1000;

        // 유저가 고른 포토카드 번호
        let id = Math.round(Math.random() * 5);

        appendList('photo', id);
        removeList();
        animateScale();

        // 일정 시간마다 리스트 출력
        function appendList(type, id) {
            let transPos;
            let txtNum = Math.round(Math.random() * 3);
            id = Math.round(Math.random() * 5);
            id == 3 ? transPos = 'transPos' : '';
            
            const appendHtml = setInterval(function () {
                html = '';
                let userTxtSelect = assetsJson.txt_card_url[id]
                let userTxtDesc = assetsJson.txt[txtNum];

                let randomLeft = (Math.floor(Math.random() * 100).toFixed(0));
                let randomScale = Number((Math.floor(Math.random() * 100) / 100).toFixed(2));

                // left값이 100이 넘을때 화면 안으로 들어오게 변수 설정
                randomLeft > 95 ? randomLeft = randomLeft - 5 : randomLeft;

                if (randomScale > 1) {
                    randomScale = 1;
                } else if (randomScale < 0.5) {
                    randomScale = randomScale + 0.5;
                }

                html += '<li style="left:' + randomLeft + '%; transform:scale(' + randomScale + ')" data-scale="' + randomScale + '">';
                html += '<div class="lantern left">';
                html += '<img src="images/lantern/lantern_01.png">';
                html += '<div class="light" style="animation-duration:' + (randomScale * 2) + 's"></div>';
                html += '</div>';
                html += '<div class="person left">';
                if(type == 'txt'){
                        html += '   <div class="card_box" style="background-image: url(' + userTxtSelect + ');">';
                        html += '   <p class=' + transPos + '>' + userTxtDesc + '</p>';
                        html += '   </div>';
                }else{
                    html += '   <div class="card_box">';
                    html += '   <img src="' + data[listIdx].url + '">';
                    html += '   </div>';
                }
                html += '</div>';

                if (listIdx == data.length - 1) {
                    listIdx = 0;

                    // idx == 0이 되면 함수 막고
                    clearTimeout(appendHtml);
                    // 일정 시간 뒤 재 호출
                    setTimeout(appendList('photo', id), startDelay);
                } else {
                    listIdx++;
                }

                $('#resultCenter').append(html);

                // animateTrasnform();

            }, addDelay)

            addDelay = 3000;
        }

        // 일정 시간마다 리스트 출력

        // 리스트 애니메이션 Start

        // 리스트 Scale 감소 Start
        function animateScale() {

            let opacitySecond = 20;

            const setScale = setInterval(function () {
                $('.result').find('li').each(function () {
                    let orgScale = $(this).attr('data-scale');

                    if(orgScale > 0.3){
                        orgScale -= (orgScale / opacitySecond);
                    }else{
                        orgScale = 0.3;
                    }

                    $(this).css('transform', 'scale(' + orgScale + ')')
                    $(this).css('transition', 'transform 2s linear')
                    $(this).attr('data-scale', orgScale);

                    clearTimeout(setScale, 1000);
                })
                animateScale();
            }, 1000)

        }
        // 리스트 Scale 감소 End

        // 리스트 좌우 애니메이션 Start
        function animateTrasnform() {
            let randomTranslate = (Math.floor(Math.random() * 100).toFixed(0));

                animateItem($('#result').find('li:last-child .person'), randomTranslate * 10)
                animateItem($('#result').find('li:last-child .lantern'), randomTranslate * 10)

                function animateItem(item, x) {
                    setTimeout(function () {
                        let thisLeft = Number(item.parent().css('left').slice(0, -2));

                        let windowLeft = $(window).width() / 8;
                        let windowRight = $(window).width() - windowLeft;

                        if(windowRight < thisLeft + x){
                            x = - (x * 2);
                        }else if(windowLeft > thisLeft + x){
                            x = (x * 2);
                        }
                        
                        item.css({
                            'transform': 'translateX(' + (x) + 'px)',
                            'transition': 'transform 20s'
                        })
                    }, 50)
                }
        }
        // 리스트 좌우 애니메이션 End
        // 리스트 애니메이션 End

        // bottom 100%시 리스트 삭제
        function removeList() {
            setInterval(function () {
                if ($('#result').find('li').length > 0) {
                    $('#result').find('li').each(function () {
                        if ($(this).css('bottom') == $(window).height() + 'px') {
                            $(this).remove();
                        };
                    })
                }
            }, 1000)
        }
    });
}
});