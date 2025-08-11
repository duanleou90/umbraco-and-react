function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

function toggleLanguageDropdown() {
    document.getElementById("languageDropdown").classList.toggle("show");
    var rotate = document.getElementById("lng-icon").style.transform;
    rotate === "rotate(180deg) scale(1.5)"
        ? document.getElementById("lng-icon").style.transform = "rotate(0deg) scale(1.5)"
        : document.getElementById("lng-icon").style.transform = "rotate(180deg) scale(1.5)";
}

window.onclick = function (event) {
    var dropdown = document.getElementById("languageDropdown");
    var headerLanguages = document.querySelector('.header__languages');

    // Check if the clicked element is not within the language dropdown or header__languages
    if (!dropdown.contains(event.target) && !headerLanguages.contains(event.target)) {
        dropdown.classList.remove('show');
        document.getElementById("lng-icon").style.transform = "rotate(0deg) scale(1.5)";
    }
}
document.querySelectorAll('.header__menu__item__children__wrap').forEach(item => {
    item.addEventListener('click', (e) => {
        if (item == e.target) {
            const fakeClick = handleMenuItemClick.bind(item.parentElement.firstElementChild);
            fakeClick(e);
        }
    });
});

var openedMenusCount = 0;
const needHelp = document.querySelector('.header__menu__mobile');
const contactUsHeader = document.querySelector('.header__buttons');
const menuItemsWithChildren = document.querySelectorAll('.header__menu__item');
const menuItemsArray = Array.from(menuItemsWithChildren);
const activeMenuItemInfo = menuItemsArray.find(menuItem => {
    const menuItemInfo = menuItem.querySelector('.header__menu__item__info');
    return menuItemInfo && menuItemInfo.classList.contains('header__menu__item__info--active')
});


/* кнопки тегів */
const tagFilterButtons = Array.from(document.querySelectorAll('.tag-button'));
if (tagFilterButtons.length > 0) {
    tagFilterButtons.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tagFilterButtonImg = document.querySelectorAll('.tag-button > img');
            let icon = "";
            if (tagFilterButtons.indexOf(item) == 0) {
                icon = 'filter';
            } else {
                icon = 'close';
            }
            tagFilterButtonImg[tagFilterButtons.indexOf(item)].setAttribute('src', `/Content/images/${icon}-active.svg`);/*filter-active */
        });
        item.addEventListener('mouseleave', () => {
            const tagFilterButtonImg = document.querySelectorAll('.tag-button > img');
            let icon = "";
            if (tagFilterButtons.indexOf(item) == 0) {
                icon = 'filter';
            } else {
                icon = 'close';
            }
            tagFilterButtonImg[tagFilterButtons.indexOf(item)].setAttribute('src', `/Content/images/${icon}.svg`);
        });
    });
    tagFilterButtons[0].addEventListener('click', () => {
        const tagsMenu = document.querySelector('.content-aside__menu-tags');
        getComputedStyle(tagsMenu, null).display == 'none' ? tagsMenu.style.display = 'flex' : tagsMenu.style.display = 'none';
        tagFilterButtons[0].style.display = 'none';
        tagFilterButtons[1].style.display = 'flex';
        document.getElementById('filter-hr').style.display = 'block';
    });
    tagFilterButtons[1].addEventListener('click', () => {
        const tagsMenu = document.querySelector('.content-aside__menu-tags');
        getComputedStyle(tagsMenu, null).display == 'none' ? tagsMenu.style.display = 'flex' : tagsMenu.style.display = 'none';
        tagFilterButtons[0].style.display = 'flex';
        tagFilterButtons[1].style.display = 'none';
        document.getElementById('filter-hr').style.display = 'none';
    });
}


function toggleMenuItems(menuItem, itemChildren, itemIcon) {
    itemIcon.classList.toggle('rotate');

    if (itemChildren.classList.contains('header__menu__item__children--visible')) {
        itemIcon.style.background = 'url("/Content/images/menu_arrow.svg") no-repeat';
        openedMenusCount--;
    } else {
        openedMenusCount++;
        /*itemIcon.style.background = 'url("/Content/images/menu_arrow_active.svg") no-repeat';*/
    }

    itemChildren.classList.toggle('header__menu__item__children--visible');

    //menuItem.classList.toggle('header__menu__item--left-line');

    if (menuItem) {
        const childrenWrap = menuItem.querySelector('.header__menu__item__children__wrap');
        if (childrenWrap) {
            childrenWrap.classList.toggle('header__menu__item__children__wrap--visible');
        }
    }

    //if (openedMenusCount > 0) {
    //    needHelp.style.display = "none";
    //    contactUsHeader.style.display = "block";
    //} else {
    //    needHelp.style.display = "block";
    //    contactUsHeader.style.display = "block";
    //}
}

let startWindowWidth = window.innerWidth;
function bindMenuEvents() {
    menuItemsWithChildren.forEach((menuItem, index) => {
        const itemChildren = menuItem.querySelector('.header__menu__item__children');
        if (itemChildren) {

            if (window.innerWidth < 950) {

                if (startWindowWidth > 950) {
                    startWindowWidth = window.innerWidth;
                    window.location.reload();
                }

                menuItem.firstElementChild.removeEventListener('click', handleMenuItemClick);
                menuItem.firstElementChild.removeEventListener('click', handleMenuItemMobileClick);
                menuItem.firstElementChild.addEventListener('click', handleMenuItemMobileClick);

                /* перенесення мови */
                const attributes = document.getElementById('attributes');
                const logo = document.querySelector('.header__logo');
                if (logo != null) {
                    logo.after(attributes);
                }

                /* перенесення readtime */
                const readtime = document.querySelector('.readtime');
                const spans = document.querySelector('.author-text');
                if (spans != null) {
                    if (spans.nextElementSibling) {
                        spans.nextElementSibling.after(readtime);
                    }
                }

                /* events для відкриття підменю */
                const header__menu__item__children__right = menuItem.querySelector('.header__menu__item__children__right');
                if (header__menu__item__children__right != null) {
                    header__menu__item__children__right.style = 'display: flex';

                    const itemChildrenItem = header__menu__item__children__right.querySelectorAll('div > .header__menu__item__children__item');
                    itemChildrenItem.forEach(item => {
                        /* item.lastElementChild - arrow                             
                           item.nextElementSibling - submenu */
                        if (item.lastElementChild.classList.contains('header__menu__item__icon__nested')) {                            
                            const submenuOpen = (e) => {
                                e.preventDefault();

                                if (getComputedStyle(item.nextElementSibling, null).display == 'none') {
                                    item.nextElementSibling.style.display = 'block';
                                    //item.firstElementChild.style.color = 'black';
                                    item.lastElementChild.classList.toggle('header__menu__item__icon__nested--active');
                                } else {
                                    item.nextElementSibling.style.display = 'none';
                                    //item.firstElementChild.style.color = 'black';
                                    item.lastElementChild.classList.toggle('header__menu__item__icon__nested--active');
                                }
                            }
                            if (item.onclick == null) {
                                item.onclick = submenuOpen;
                            }
                        }
                    });
                }

                /* відкриття поточного меню */
                    /* без підменю */
                const links = itemChildren.querySelectorAll('.header__menu__item__children__item > a');
                links.forEach(link => {
                    if (link.href == window.location.href && link.pathname != '/' && link.attributes.href.value != '') {
                        let currentElement = link;
                        while (!currentElement.classList.contains('header__menu__item') && currentElement != null) {
                            currentElement = currentElement.parentElement;
                        }
                        if (currentElement != document.body && currentElement != null) {
                            const childrenWrap = currentElement.querySelector('.header__menu__item__children__wrap');
                            /* перевіряємо чи воно не відкрите */
                            if (!childrenWrap.classList.contains('header__menu__item__children__wrap--visible')) {
                                const info = currentElement.querySelector('.header__menu__item__info');
                                info.click();
                            }
                        }
                    }
                });
                    /* з підменю */
                const sublinks = itemChildren.querySelectorAll('.header__menu__item__children__item__nested-children__item > a');
                sublinks.forEach(link => {
                    if (link.href == window.location.href && link.pathname != '/' && link.attributes.href.value != '') {
                        let currentElement = link;
                        while (!currentElement.classList.contains('header__menu__item__children__container') && currentElement != null) {
                            currentElement = currentElement.parentElement;
                        }
                        if (currentElement != document.body && currentElement != null) {                            
                            /* перевіряємо чи воно не відкрите */
                            if (getComputedStyle(currentElement.querySelector('.header__menu__item__children__item__nested'), null).display != 'block') {
                                const arrowToOpen = currentElement.querySelector('.header__menu__item__icon__nested');
                                arrowToOpen.click();
                            }

                            while (!currentElement.classList.contains('header__menu__item') && currentElement != null) {
                                currentElement = currentElement.parentElement;
                            }
                            if (currentElement != document.body && currentElement != null) {
                                const childrenWrap = currentElement.querySelector('.header__menu__item__children__wrap');
                                /* перевіряємо чи воно не відкрите */
                                if (!childrenWrap.classList.contains('header__menu__item__children__wrap--visible')) {
                                    const info = currentElement.querySelector('.header__menu__item__info');
                                    info.click();
                                }
                            }
                        }
                    }
                });

                /* картинки після тексту */
                const images = Array.from(document.querySelectorAll('.block-image'));
                if (images != null) {
                    const imageAreas = images.filter(item => {
                        while (!item.classList.contains('umb-block-grid__area')) {
                            if (item.localName != 'body') {
                                item = item.parentElement;
                            }
                            else {
                                return false;
                            }
                        }
                        return true;
                    });
                    if (imageAreas.length > 0) {
                        imageAreas.forEach(item => {
                            if (getComputedStyle(item, null).order == 0) {
                                item.style.order = 2;
                            }
                        });
                    }
                }

                /* видалення display:flex у blogpost для вирівнювання */
                const main = document.querySelector('main');
                if (main != null) {
                    if (getComputedStyle(main, null).display === 'flex') {
                        main.style.display = 'block';
                    }
                }

            } else {
                if (startWindowWidth < 950) {
                    startWindowWidth = window.innerWidth;
                    window.location.reload();
                }

                menuItem.firstElementChild.removeEventListener('click', handleMenuItemMobileClick);
                menuItem.firstElementChild.removeEventListener('click', handleMenuItemClick);
                menuItem.firstElementChild.addEventListener('click', handleMenuItemClick);

                const attributes = document.getElementById('attributes');
                const nav = document.querySelector('nav');
                if (nav != null) {
                    nav.after(attributes);
                }

                const readtime = document.querySelector('.readtime');
                const buttonShareParent = document.getElementById('myButton');
                if (buttonShareParent != null) {
                    if (buttonShareParent.parentElement != null) {
                        buttonShareParent.parentElement.before(readtime);
                    }
                }

            }
        }
    });
}

function handleMenuItemClick(event) {

    //var link = event.target;
    //var currentUrl = window.location.href;

    //if (link.href === currentUrl) {
        event.preventDefault(); // Prevent the default behavior (redirect)
    //}

    //if (event.target.classList.contains("header__menu-link")) {
    //    return; // Prevent the behavior (opening menu)
    //}
    const clickedMenuItem = this.parentElement;
    const menuItemInfo = clickedMenuItem.querySelector('.header__menu__item__info');
    const itemIcon = clickedMenuItem.querySelector('.header__menu__item__icon');
    const childrenWrap = clickedMenuItem.querySelector('.header__menu__item__children__wrap');

    menuItemsWithChildren.forEach((menuItem) => {
        if (menuItem !== clickedMenuItem) {
            const otherMenuItemInfo = menuItem.querySelector('.header__menu__item__info');
            const otherItemIcon = menuItem.querySelector('.header__menu__item__icon');
            const otherChildrenWrap = menuItem.querySelector('.header__menu__item__children__wrap');

            if (otherChildrenWrap) {
                otherChildrenWrap.classList.remove('header__menu__item__children__wrap--visible');
                otherMenuItemInfo.classList.remove('header__menu__item__info--active');
                otherItemIcon.classList.remove('header__menu__item__icon--active');
            } else {
                otherMenuItemInfo.classList.remove('header__menu__item__info--active');
            }

            if (activeMenuItemInfo) {
                activeMenuItemInfo.classList.remove('header__menu__item__info--active')
            }
        }
    });

    childrenWrap.classList.toggle('header__menu__item__children__wrap--visible');
    itemIcon.classList.toggle('header__menu__item__icon--active');

    if (activeMenuItemInfo) {
        const nameOfActiveMenuItem = activeMenuItemInfo.innerText.split('\n')[0];
        if (menuItemInfo.innerText !== nameOfActiveMenuItem) {
            menuItemInfo.classList.toggle('header__menu__item__info--active');
        } else {
            menuItemInfo.classList.add('header__menu__item__info--active');
        }
    } else {
        menuItemInfo.classList.toggle('header__menu__item__info--active');
    }

    const menuItemWithOpenMenu = menuItemsArray
        .filter(menuItem => menuItem.querySelector('.header__menu__item__children__wrap--visible') !== null);

    if (menuItemWithOpenMenu.length === 0) {
        setTimeout(() => {
            if (activeMenuItemInfo) {
                activeMenuItemInfo.classList.add('header__menu__item__info--active');
            }
        }, 300);
    }
}


function handleMenuItemMobileClick(event) {
    event.preventDefault(); // Prevent the default behavior (redirect)

    const menuLink = this.parentElement.querySelector('.header__menu-link');
    const itemChildren = this.parentElement.querySelector('.header__menu__item__children');
    const itemIcon = this.parentElement.querySelector('.header__menu__item__icon');
    const childrenWrap = this.parentElement.querySelector('.header__menu__item__children__wrap');
    childrenWrap.classList.toggle('.header__menu__item__children__wrap--visible');
    itemIcon.classList.toggle('header__menu__item__icon--active');
    menuLink.classList.toggle('header__menu-link--active');
    toggleMenuItems(this.parentElement, itemChildren, itemIcon);
}

window.addEventListener('resize', () => {
    bindMenuEvents();
});

document.addEventListener("DOMContentLoaded", function () {
    bindMenuEvents();

    const backToTopButton = document.getElementById("to_top_button");

    backToTopButton.addEventListener('click', function () {
        window.scroll({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    });

    /*Меню-бургер, открытие\закрытие*/
    document.querySelector('.header__burger').addEventListener('click', function (e) {
        e.preventDefault();
        const burger = document.querySelector('.header__burger');
        const burgerImg = document.querySelector('.header__burger img');
        const navigation = document.querySelector('.header__navigation');
        burger.classList.toggle('header__burger--active');
        navigation.classList.toggle('header__navigation--active');

        // Update the image source
        if (burger.classList.contains('header__burger--active')) {
            burgerImg.src = '/Content/images/close-lg_svgrepo.com.svg';
            document.body.style.overflow = 'hidden';
        } else {
            burgerImg.src = '/Content/images/menu-alt-1_svgrepo.com.svg';
            document.body.style.overflow = 'auto';
        }
    });

    /*Плавный переход по клику на пунктах главного меню*/
    document.querySelectorAll('nav').forEach((el) => {
        el.addEventListener('click', function (e) {
            /*if (e.target.tagName == 'A') {
                if (document.querySelector('.header__burger').classList.contains('header__burger--active')) {
                    document.querySelector('.header__burger').classList.remove('header__burger--active');
                    document.querySelector('.header__navigation').classList.remove('header__navigation--active');
                    document.body.style.overflow = 'auto';


                    const burger = document.querySelector('.header__burger');
                    const burgerImg = document.querySelector('.header__burger img');
                    // Update the image source
                    if (burger.classList.contains('header__burger--active')) {
                        burgerImg.src = '/Content/images/close-lg_svgrepo.com.svg';
                        document.body.style.overflow = 'hidden';
                    } else {
                        burgerImg.src = '/Content/images/menu-alt-1_svgrepo.com.svg';
                        document.body.style.overflow = 'auto';
                    }
                }
            }*/
        })
    })

    /*Переход на секцию "Связаться с нами" из шапки сайта*/
    document.querySelectorAll('.header__button').forEach((el) => {
        el.addEventListener('click', function (e) {
            if (e.target.getAttribute("href")[0] === "#") {
                e.preventDefault();
                if (document.querySelector('.header__burger').classList.contains('header__burger--active')) {
                    document.querySelector('.header__burger').classList.remove('header__burger--active');
                    document.querySelector('.header__navigation').classList.remove('header__navigation--active');
                    document.body.style.overflow = 'auto';
                }
                var id = e.target.getAttribute("href");
                var url = e.target.dataset.link;
                var element = document.querySelector(id);
                if (element) {
                    window.scroll({
                        left: 0,
                        top: findPos(element),
                        behavior: 'smooth'
                    });
                } else {
                    location.href = url;
                }
            }
        })
    })

    /*"Приклеивание" меню-шапки к верху экрана*/
    window.addEventListener('scroll', function () {
        if (this.scrollY > this.innerHeight) { document.querySelector('#header').classList.add('header--active'); }
        else { document.querySelector('#header').classList.remove('header--active'); }
    });


    /*Показывание (скролл вверх) и скрытие (скролл вниз) меню при прокрутке странцы*/
    var header = document.querySelector('#header'),
        scrollPrev = 0;
    window.addEventListener('scroll', function () {
        var scrolled = this.scrollY;
        if (scrolled > 100 && scrolled > scrollPrev) {
            header.classList.add('out');
        } else {
            header.classList.remove('out');
        }
        scrollPrev = scrolled;
    }, { passive: true });

    /*Показывание (скролл вниз) и скрытие (скролл вверх) кнопки "Back to top" при прокрутке странцы*/
    window.addEventListener('scroll', function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, { passive: true });

    /*dropdown list for search*/
    $('.search__form-select__button').click(function (e) {
        var form = $(this).parents("form#form-search")
        $(form).find('.search__form-select__list').toggleClass('hide');
        $(form).find('.search__form-select__list > li').css('display', 'block');
    });

    $('.search__form-select__item').click(function (e) {

        var value = $(this).find('button').data("value");
        var text = $(this).find('button').first().text();


        if (text.length !== 0 && value.length !== 0) {
            $('.search__form-select__input').val(value);
            $('.search__form-select__button').text(text);
        }

        $('.search__form-select__list').addClass('hide');
    });

    /*message error for search*/
    $('button#submit-search').click(function (e) {
        e.preventDefault();

        var form = $(this).parents('form#form-search')

        var element = $(form).find('#input-search');

        var min = $(element).attr('min');

        if (element.val().length < (min === "" ? 4 : min)) {
            $(form).find('.search__error-message').show();
        } else {
            $(form).find('.search__error-message').hide();
            page = 1;
            $(form).submit();
        }
    })

    /* get data from Search Api Controller */
    $("form#form-search").submit(function (event) {
        event.preventDefault();

        $(".pagination").addClass("d-none")

        var section = $(this).parents('#search')

        var searchResult = $(section).find("#print-result-search .search__result")

        var $form = $(this),
            query = $form.find("input[name='query']").val(),
            button = $form.find("button[type='submit']"),
            typeSearch = $form.find("input[name='typeSearch']").val(),
            url = $form.attr("action");

        button.prop('disabled', true);

        $(searchResult).empty();

        var $post = $.post(url, { query, typeSearch, takeElem, page: (page - 1) >= 0 ? page - 1 : 0 });

        $post.done(function (data) {

            $(section).find("#print-result-search .search__result__title").html("Your search " + query + " returned " + data.resultCount + " results")

            var sortData = data.searchResults.sort(function (a, b) {
                if (a.score < b.score) {
                    return 1;
                } else {
                    return -1;
                }
            })

            sortData.forEach(element => {

                var title = $('<h5/>')
                    .addClass("search__result__title-card")
                    .text(element.title)

                var description = $('<p/>')
                    .addClass("search__result__description-card")
                    .text(element.description)

                var link = $("<a/>")
                    .attr('href', element.url)
                    .addClass("search__result__link-card font-link-default")
                    .text(window.location.origin + element.url);

                var div = $('<div/>')
                    .addClass("search__result__card")
                    .append(title)
                    .append(description)
                    .append(link)

                $(searchResult).append(div);

            })

            CreatePagination(page, data.resultCount, takeElem);

            if (sortData.length > 0) {
                $(".pagination").removeClass("d-none")
            }

        }).fail(function (data) {
        }).always(function () {
            button.prop('disabled', false);
        }).catch(function (e) { console.log(e) });
    })

    /*send data to contact api controller*/
    $("form#contactForm").submit(function (event) {
        event.preventDefault();
        var $form = $(this),
            subject = $form.find("input[name='subject']").val(),
            name = $form.find("input[name='name']").val(),
            email = $form.find("input[name='email']").val(),
            toEmail = $form.find("input[name='toEmail']").val(),
            company = $form.find("input[name='company']").val(),
            phone = $form.find("input[name='phone']").val(),
            site = $form.find("input[name='site']").val(),
            linkedIn = $form.find("input[name='linkedInUrl']").val(),
            education = $form.find("input[name='education']").val(),
            levelOfEnglish = $form.find("select[name='LevelOfEnglish']").length > 0 ? $form.find("select[name='LevelOfEnglish']")[0].selectedOptions[0].text : 'undefined',
            resumeFile = $form.find("input[name='pdfFile']").length != 0 ? $form.find("input[name='pdfFile']")[0].files[0] : null,
            message = $form.find("textarea[name='message']").val(),
            button = $form.find("button[type='submit']"),
            recaptcha = $form.find(".g-recaptcha").data("sitekey"),
            response = $("#g-recaptcha-response").val(),
            __RequestVerificationToken = $form.find("input[name='__RequestVerificationToken']").val();

        url = $form.attr("action");

        button.prop('disabled', true);

        if (!!!($('#g-recaptcha-response').val()) && typeof recaptcha !== 'undefined') {
            $(".contact__recaptcha").show();

            button.prop('disabled', false);
        } else {
            $(".contact__recaptcha").hide();
            recaptcha = typeof recaptcha !== 'undefined' ? recaptcha : "not used";
            response = typeof response !== 'undefined' ? response : "not used";

            let formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            formData.append('recaptcha', recaptcha);
            formData.append('toEmail', toEmail);
            formData.append('phone', phone);
            formData.append('subject', subject);
            formData.append('response', response);
            formData.append('__RequestVerificationToken', __RequestVerificationToken);
            formData.append('site', site);
            formData.append('company', company);
            formData.append('linkedIn', linkedIn);
            formData.append('education', education);
            formData.append('levelOfEnglish', levelOfEnglish);
            formData.append('resumeFile', resumeFile);

            $.ajax({
                type: "POST",
                url: url,
                data: formData,
                processData: false,
                contentType: false,
            }).done(function (data) {
                $(".contact__success-answer").show("slow");
                $(".contact__response-message").css("display", "flex");
                $(".contact__form").css("display", "none");
                $("#contactForm").css("display", "none");
                $(".contact__error-answer").hide("slow");
            }).fail(function (data) {
                $(".contact__error-answer").show("slow");
                $(".contact__success-answer").hide("slow");
            }).always(function () {
                $form.find("input[name='name']").val("");
                $form.find("input[name='email']").val("");
                $form.find("input[name='company']").val("");
                $form.find("input[name='phone']").val("");
                $form.find("textarea[name='message']").val("");
                $form.find("input[name='linkedInUrl']").val("");
                $form.find("input[name='education']").val("");
                $form.find("select[name='LevelOfEnglish']").length > 0 ? $form.find("select[name='LevelOfEnglish']")[0].selectedIndex = 0 : "";
                if ($form.find("div[class='select-selected']").length > 0) {
                    $form.find("div[class='select-selected']")[0].innerHTML = $form.find("select[name='LevelOfEnglish']")[0].selectedOptions[0].innerHTML;
                    $form.find("div[class='select-selected']").css('color', '#707087');
                }

                // insted of resumeFile                
                $form.find("label[id='pdfLabel']").text("Select file Resume");
                $form.find("label[id='pdfLabel']").css('color', '');

                button.prop('disabled', false);
            }).catch(function (e) { console.log(e) });
        }
    });

    $('.header__button#goBackContact').click(function (e) {
        $(".contact__response-message").css("display", "none");
        $(".contact__form").css("display", "block");
        $("#contactForm").css("display", "");
    });

    //check for duplicate search types
    var itemsTypeSearch = $(".search__form-select .search__form-select__item");
    if (itemsTypeSearch.length > 1) {
        var typesSearch = [];

        $(itemsTypeSearch).each(function (index) {
            var element = $(itemsTypeSearch)[index];

            var value = $(element).find("button").data("value");

            if (typesSearch.includes(value)) {
                $(element).hide();
            } else {
                typesSearch.push(value);
            }
        });

        if (typesSearch.length < 2) {
            $(".search__form-select").hide();
        }
    }

    //pagination for api controller (search)
    var page = 1;
    var takeElem = parseInt($(".pagination").data("take-elem"), 10) || 5;

    $("section.search .pagination .pagination__item").click(function () {
        event.preventDefault();

        if ($(this).data("page") != undefined) {
            page = parseInt($(this).data("page"), 10) || 1;

            $("form#form-search").submit();
        }
    })

    var CreatePagination = function (page, resultCount, takeElem) {
        var maxPage = Math.ceil(resultCount / takeElem);
        var links = $(".pagination .pagination__item");

        var leftArrow = links[0],
            firstPage = links[1],
            firstThreeFullStop = links[2],

            activePageMinusTwo = links[3],
            activePageMinusOne = links[4],
            activePage = links[5],
            activePagePlusOne = links[6],
            activePagePlusTwo = links[7],

            lastThreeFullStop = links[8],
            lastPage = links[9],
            rightArrow = links[10];

        var optionsItemsPagination = new Array(
            { element: leftArrow, condition: ((page - 1) < 1), dataPage: page - 1 },
            { element: firstPage, condition: ((page - 3) < 1), dataPage: 1, changeElementInHtml: true },
            { element: firstThreeFullStop, condition: ((page - 4) < 1) },

            { element: activePageMinusTwo, condition: ((page - 2) < 1), dataPage: page - 2, changeElementInHtml: true },
            { element: activePageMinusOne, condition: ((page - 1) < 1), dataPage: page - 1, changeElementInHtml: true },

            { element: activePage, dataPage: page, changeElementInHtml: true },

            { element: activePagePlusOne, condition: ((page + 1) > maxPage), dataPage: page + 1, changeElementInHtml: true },
            { element: activePagePlusTwo, condition: ((page + 2) > maxPage), dataPage: page + 2, changeElementInHtml: true },

            { element: lastThreeFullStop, condition: ((page + 4) > maxPage) },
            { element: lastPage, condition: ((page + 3) > maxPage), dataPage: maxPage, changeElementInHtml: true },
            { element: rightArrow, condition: ((page + 1) > maxPage), dataPage: page + 1 },
        );

        CreateItemPagination(optionsItemsPagination);
    }

    var CreateItemPagination = (optionsItemsPagination) => {
        optionsItemsPagination.forEach(item => {

            if (typeof (item.condition) !== "undefined")
                $(item.element).addClass(item.condition ? "d-none" : "")
                    .removeClass(!(item.condition) ? "d-none" : "");

            if (typeof (item.dataPage) !== "undefined")
                $(item.element).data("page", item.dataPage);

            if (item.changeElementInHtml === true)
                $(item.element).html(item.dataPage);
        })
    };

    /*Переключение табов в блоке с сотрудниками*/
    $('.employees__trigger').on('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-tab');
        $('.employees__trigger').removeClass('employees__trigger--active');
        $('.employees__tab').fadeOut(0);
        $(this).addClass('employees__trigger--active');
        $('#' + id).fadeIn(300);
    });

    /*Аккордеон в блоке с сотрудниками*/
    $('.employees__item-button').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.employees__item-heading').toggleClass('employees__item-heading--active').next('.employees__item-info').slideToggle(300);
    });

    /*Слайдер, главная страница, Новая команда*/
    $('.new-team__slider').slick({
        infinite: true,
        slidesToShow: $('.new-team__slider').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="new-team__arrow new-team__arrow--prev"><img src="/Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="new-team__arrow new-team__arrow--next"><img src="/Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    $('.reviews__slider').slick({
        infinite: true,
        slidesToShow: $('.reviews__slider').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="reviews__arrow reviews__arrow--prev"><img src="/Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="reviews__arrow reviews__arrow--next"><img src="/Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    });
    $('.slider-one').slick({
        infinite: true,
        slidesToShow: $('.slider-one').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="slider-one__arrow slider-one__arrow--prev"><img src="/Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="slider-one__arrow slider-one__arrow--next"><img src="/Content/images/slider-arrow-next.svg" alt="Next arrow"></button>'
    });
    $('.new-team2__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '<button type="button" class="new-team2__arrow new-team2__arrow--prev"><img src="/Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="new-team2__arrow new-team2__arrow--next"><img src="/Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        dots: true,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 401,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });
    /*Подключение слайдера на первом экране*/
    $('.team__slider').slick({
        infinite: true,
        slidesToShow: $('.team__slider').data("slides-show"),
        slidesToScroll: 1,
        speed: 1000,
        dots: true,
        prevArrow: '<button type="button" class="team__arrow team__arrow--prev"><img src="/Content/images/slider-arrow-prev.svg" alt="Prev arrow"></button>',
        nextArrow: '<button type="button" class="team__arrow team__arrow--next"><img src="/Content/images/slider-arrow-next.svg" alt="Next arrow"></button>',
        responsive: [
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
// Открытие\закрытие детальной информации по разработчику
$('.new-slide__team-details.more-button').on('click', function (e) {
    e.preventDefault();
    let detailsBlock = $(this).data('details'),
        parent = $(this).closest('.new-slide__team'),
        infoBlock = parent.siblings('.new-slide__members');
    parent.fadeOut(0);
    infoBlock.find('.new-slide__members-wrap[data-tab="' + detailsBlock + '"]').fadeIn(300);
});

$('.new-slide__team-details.back-button').on('click', function (e) {
    e.preventDefault();
    let parent = $(this).closest('.new-slide__members-wrap'),
        teamBlock = $(this).closest('.new-slide__members').siblings('.new-slide__team');
    parent.fadeOut(0);
    teamBlock.fadeIn(300);
});
//Выпадющий список вопрос ответ
$(document).ready(function () {

    var elementForAccordion;

    $(".accordion__item").click(function (e) {

        if (elementForAccordion) {
            if (!$(elementForAccordion).find(".accordion__answer").is(":hidden")) {
                $(elementForAccordion).find(".accordion__answer").slideUp();
            }

            if ($(elementForAccordion).find(".accordion__question").hasClass("accordion__active__title"))
                $(elementForAccordion).find(".accordion__question").removeClass("accordion__active__title");

            if ($(elementForAccordion).hasClass("active"))
                $(elementForAccordion).removeClass("active");
        }

        elementForAccordion = this

        if ($(this).find(".accordion__answer").is(":hidden")) {
            $(this).find(".accordion__answer").slideDown();

            if (!$(this).hasClass("active"))
                $(this).addClass("active");
        } else {
            $(this).find(".accordion__answer").slideUp();
        }
    });
})

//Nofollow for all external links
$(document).ready(function () {
    $("a[href^='http://']").each(function () {
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).attr('rel', 'nofollow');
        }
    });
    $("a[href^='https://']").each(function () {
        if (this.href.indexOf(location.hostname) == -1) {
            $(this).attr('rel', 'nofollow');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('#myButton');

    if (button) {
        button.addEventListener('click', function (e) {
            setupContextMenu(e);
        });
    }
});
function setupContextMenu(e) {
    const button = document.querySelector('#myButton');
    const menu = document.querySelector('#contextMenu');

    if (button) {
        e.preventDefault();
        e.stopPropagation();

        if (menu.hidden == true) {
            menu.hidden = false;
        } else {
            menu.hidden = true;
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const rect = button.getBoundingClientRect();
        const menuWidth = menu.offsetWidth;

        menu.setAttribute('data-arrow-position', 'true');
        menu.style.setProperty('--arrow-position', `${menuWidth * 0.7}px`);

        if (Math.abs(rect.right - menu.getBoundingClientRect().right) > 10) {
            menu.style.left = `${rect.right - menu.getBoundingClientRect().right}px`;
        }
    }

    window.addEventListener('click', () => {
        if (menu) {
            menu.hidden = true;
        }
    });
}

$(document).ready(function () {
    function toggleBlocks() {
        // Проверяем, видим ли блок с классом 'left-block'
        var isLeftBlockVisible = $('.left-block').is(":visible");

        if (isLeftBlockVisible) {
            // Если левый блок видим, то мы скрываем его
            $('.left-block').fadeOut(function () {
                // Убираем стили у левого блока после завершения анимации
                $('.left-block').each(function () {
                    this.style.removeProperty('padding');
                });

                // Показываем правый блок только после полного исчезновения левого блока
                $('.right-block').fadeIn();
            });
        } else {
            // Если левый блок не видим, скрываем правый блок
            $('.right-block').fadeOut(function () {
                // После исчезновения правого блока, показываем левый блок
                $('.left-block').fadeIn();

                // Добавляем стили к левому блоку
                $('.left-block').each(function () {
                    this.style.setProperty('padding', '10px 10px 56px 10px', 'important');
                });
            });
        }
    }

    // Обработчики кликов остаются прежними
    $('.responsive-button').click(function () {
        toggleBlocks();
    });

    $('.back-button').click(function () {
        toggleBlocks();
    });
});



document.addEventListener('DOMContentLoaded', function () {
    function applyStylesToElement(element) {
        element.style.setProperty("padding", "0px", "important");
    }

    // Функция, которая будет вызываться при нажатии на кнопку
    function onButtonClick() {
        var parentElements = document.querySelectorAll('.full-bleed');

        parentElements.forEach(function (parent) {
            var childElement = parent.querySelector('.right-block');

            if (childElement) {
                applyStylesToElement(parent);
            }
        });
    }

    // Находим кнопку по классу и добавляем обработчик события
    var button = document.querySelector('.contact__form-button.responsive-button');
    if (button) {
        button.addEventListener('click', onButtonClick);
    }
});

// Careers page - open more information
document.querySelectorAll('.career-vacancies__main-cardslist__card-button').forEach(item => {
    if (item.parentElement.tagName == "P2") {
        item.addEventListener("click", (e) => {
            let currentElement = item;
            while (!currentElement.classList.contains('career-vacancies__main-cardslist__card-body') && currentElement != null) {
                currentElement = currentElement.parentElement;
            }
            if (currentElement != document.body && currentElement != null) {
                currentElement.style.display = 'none';
                currentElement = currentElement.parentElement;
                const bodies = currentElement.querySelectorAll('.career-vacancies__main-cardslist__card-body');
                if (bodies.length == 2) {
                    bodies[1].style.display = '';
                }
            }
        });
    }
});

//Tags working
const allTags = Array.from(document.querySelectorAll('.career-vacancies__main-searchwithtags__tags-tag'));
if (allTags.length > 0) {
    const allActiveTags = allTags.filter(x => x.classList.contains('active'));
    const allSimpleTags = allTags.filter(x => !x.classList.contains('active'));
    const allCards = Array.from(document.querySelectorAll('.career-vacancies__main-cardslist__card'));

    const displayCardsWithActiveTags = () => {
        const allRealActiveTasg = allActiveTags.filter(_tag => {
            if (_tag.style.display == '') {
                return true;
            }
        });
        const allRealActiveTasgText = allRealActiveTasg.map(_realTag => _realTag.innerText.trim());

        allCards.forEach(card => {
            card.style.display = 'none';
        });

        allCards.forEach(card => {
            const tagsOfCard = Array.from(card.querySelectorAll('.career-vacancies__main-cardslist__card-tag'));
            const tagsOfCardText = tagsOfCard.map(_tag => _tag.childNodes[0].textContent);
            if (allRealActiveTasgText.length > 0) {
                allRealActiveTasgText.forEach(_realTag => {
                    if (tagsOfCardText.includes(_realTag)) {
                        card.style.display = '';
                    }
                });
            }
            else {
                card.style.display = '';
            }
        });
    };

    // events by clicking
    allSimpleTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // display only cards that have this tag and active tags or undisplay
            allActiveTags.forEach(_activeTag => {
                if (_activeTag.innerText.trim() == e.target.innerText) {
                    if (_activeTag.style.display == 'none') {
                        _activeTag.style.display = '';
                    }
                    else {
                        _activeTag.style.display = 'none';
                    }
                }
            });

            displayCardsWithActiveTags();
        });
    });
    allActiveTags.forEach(activeTag => {
        activeTag.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // undisplay this tag
            activeTag.style.display = 'none';

            displayCardsWithActiveTags();
        });
    });

    allActiveTags.forEach(_activeTag => {
        _activeTag.style.display = 'none';
    });
}

// Search in 'Careers' page
const searchBarCareers = document.getElementById('searchInput');
if (searchBarCareers) {
    const tags = Array.from(document.querySelectorAll('.career-vacancies__main-searchwithtags__tags-tag'));
    const _tags = tags.map(item => {
        if (!item.classList.contains('active')) {
            return item;
        }
    });    
    searchBarCareers.addEventListener('input', (e) => {
        _tags.forEach(item => {
            if (item !== undefined) {
                if (!item.textContent.toLocaleLowerCase().includes(searchBarCareers.value.toLocaleLowerCase())) {
                    item.style.display = 'none';
                }
                else {
                    item.style.display = '';
                }
            }
        })
    });
}

// Vacancy - get resume file
if (document.getElementById('pdfButton')) {
    document.getElementById('pdfButton').addEventListener('change', (e) => {
        const fileList = e.target.files;
        if (fileList[0]) {
            document.getElementById('pdfLabel').innerText = fileList[0].name;
            document.getElementById('pdfLabel').style.color = 'black';
        }
        else {
            document.getElementById('pdfLabel').innerText = 'Select file Resume';
            document.getElementById('pdfLabel').style.color = '';
        }
    });
}



// script to create select
// look for any (all) elements with the class "custom-select":
const select = document.getElementsByClassName("custom-select");
const length = select.length;

for (let i = 0; i < length; i++) {

    // select specific 'select'
    const selElmnt = select[i].getElementsByTagName("select")[0];
    const optionsCount = selElmnt.length;

    // for each element, create a new DIV that will act as the selected item:
    const divSelectedItem = document.createElement("DIV");
    divSelectedItem.setAttribute("class", "select-selected");
    divSelectedItem.style.color = '#707087';
    divSelectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    select[i].appendChild(divSelectedItem);

    // for each element, create a new DIV that will contain the option list:
    const divOptionList = document.createElement("DIV");
    divOptionList.setAttribute("class", "select-items select-hide");

    for (let j = 1; j < optionsCount; j++) {

        // for each option in the original select element,
        // create a new DIV that will act as an option item:
        const divOptionItem = document.createElement("DIV");
        divOptionItem.innerHTML = selElmnt.options[j].innerHTML;
        divOptionItem.addEventListener("click", function (e) {

            // when an item is clicked, update the original select box,
            // and the selected item:      
            const _select = this.parentNode.parentNode.getElementsByTagName("select")[0];
            const _optionsCount = _select.length;
            const selectedItem = this.parentNode.previousSibling;

            for (let i = 0; i < _optionsCount; i++) {

                // look for mew selected element
                if (_select.options[i].innerHTML == this.innerHTML) {
                    _select.selectedIndex = i;
                    selectedItem.innerHTML = this.innerHTML;
                    selectedItem.style.color = '';
                    const selectedElementInList = this.parentNode.getElementsByClassName("same-as-selected");
                    const selectedElementsInListCount = selectedElementInList.length;
                    for (let k = 0; k < selectedElementsInListCount; k++) {
                        selectedElementInList[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            selectedItem.click(); // to close item list
        });
        divOptionList.appendChild(divOptionItem);
    }
    select[i].appendChild(divOptionList);

    divSelectedItem.addEventListener("click", function (e) {
        // when the select box is clicked, close any other select boxes,
        // and open/close the current select box:
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

// a function that will close all select boxes in the document,
// except the current select box:
function closeAllSelect(currentSelectBox) {
    let arrNo = [];
    const selectItemsList = document.getElementsByClassName("select-items");
    const selectHeaders = document.getElementsByClassName("select-selected");
    const selectItemsListsCount = selectItemsList.length;
    const selectCount = selectHeaders.length;
    for (let i = 0; i < selectCount; i++) {
        if (currentSelectBox == selectHeaders[i]) {
            arrNo.push(i)
        } else {
            selectHeaders[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < selectItemsListsCount; i++) {
        if (arrNo.indexOf(i)) {
            selectItemsList[i].classList.add("select-hide");
        }
    }
}

//if the user clicks anywhere outside the select box,
// then close all select boxes:
document.addEventListener("click", closeAllSelect);