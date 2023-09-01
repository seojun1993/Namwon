// assetsJson JS START
let assetsJson = new Array();
let personJson = new Array();
let personArr = []

let personLeft, personCenter, personRight;

$(function () {
    $.ajax({
        type: 'GET',
        url: 'https://novus.run/smartluna/lunatree/list',
        contentType: 'application/json; charset=utf-8',

        success: function (data) {
            StartContent(data);
        },

        error: function (e) {
            var message = e ?.responseJSON ?.message;
            if (message) return alert(message);
        }
    });

    function StartContent(data) {
        $.getJSON("include/assets.json", function (res) {

            personJson = data;
            assetsJson = res;

            personLeft = personJson.slice(0, Math.floor(personJson.length * 0.2)); // 10분의 2
            personCenter = personJson.slice(Math.floor(personJson.length * 0.2), Math.floor(personJson.length * 0.8)); // 10분의 6
            personRight = personJson.slice(Math.floor(personJson.length * 0.8)); // 10분의 2

            let url, target, align;

            personArr.push(personLeft, personCenter, personRight);

            console.log(personArr);

            personArr.map((arr, arrIdx) => {
                arr.forEach((item, idx) => {
                    url = item.url;

                    if (arrIdx == 0) {
                        target = $('#resultLeft');
                        align = 'left'
                        idx = idx * 6000

                    } else if (arrIdx == 1) {
                        target = $('#resultCenter');
                        align = 'center'
                        idx = idx * 3000

                    } else if (arrIdx == 2) {
                        target = $('#resultRight');
                        align = 'right'
                        idx = idx * 6000
                    };
                    appendList(url, target, align, idx);
                })
            })

            function appendList(url, target, align, idx) {

                // 리스트 추가 시간
                let addDelay = idx;

                console.log(url, target, align, idx)

                let lanternNum = Math.floor(Math.random() * assetsJson.lantern.length);
                let randomPosX = Math.floor(Math.random() * 100);
                let randomScale = Math.random().toFixed(2);

                // console.log(randomScale);

                // if(align == 'left'){
                //     randomPosX = 
                // }else if(align == 'center'){
                //     randomPosX =
                // }else if(align == 'right'){
                //     randomPosX = 
                // }

                if (randomPosX > 85) {
                    randomPosX = randomPosX - 5;
                }

                if (randomScale < 0.3) {
                    randomScale = 0.3;
                }

                // console.log(randomPosX);

                if (align == 'left') {
                    PosX = `left:${randomPosX}%;`
                } else if (align == 'center') {
                    PosX = '';
                } else if (align == 'right') {
                    PosX = `left:${randomPosX}%`
                }

                let list = `<li class="${align}" style="${PosX}" data-scale="1">
                                <div class="lantern">
                                    <img src="images/lantern/lantern_0${lanternNum + 1}.png">
                                    <div class="light"></div>
                                </div>
                                <div class="person">
                                    <div class="card_box">
                                    <img src="${url}">
                                    </div>
                                </div>
                            </li>`

                setTimeout(function () {
                    target.append(list);
                }, addDelay)
            }

            removeList();

            // top 100%시 리스트 삭제
            function removeList() {
                setInterval(function () {
                    if ($('.result').find('li').length > 0) {
                        $('.result').find('li').each(function () {
                            // console.log(Math.floor($(this).css('top').slice(0, -2)));
                            // console.log($(window).height());

                            // console.log(Math.floor($(this).css('top').slice(0, -2)));
                            // console.log($(window).height());

                            if (- (Math.floor($(this).css('top').slice(0, -2))) > $(window).height()) {
                                $(this).remove();
                                console.log(2);
                            };
                        })
                    }
                }, 1000)
            }
        });
    }
});