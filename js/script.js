"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var body = document.querySelector('body');
  var wrapper = document.querySelector('.wrapper');
  var header = document.querySelector('.header'); // const headerBody = document.querySelector('.header__body');

  var burger = document.querySelector('.header__burger');
  var menu = document.querySelector('.menu');
  var menuLinks = document.querySelectorAll('.menu__link');
  var menuFirstLink = document.querySelector('.menu__link');
  var innerImage = document.querySelector('.top__image');
  var clientsInner = document.querySelector('.clients__inner');
  document.addEventListener('click', documentActions);

  function documentActions(e) {
    var targetElement = e.target;

    if (targetElement.classList.contains('header__burger')) {
      wrapper.classList.add('lock');
      body.classList.add('lock');
      burger.classList.add('hide');
      menu.classList.add('open');
    }

    if (targetElement.classList.contains('menu__btn')) {
      wrapper.classList.remove('lock');
      body.classList.remove('lock');
      burger.classList.remove('hide');
      menu.classList.remove('open');
    }

    if (!targetElement.closest('.menu') && !targetElement.classList.contains('header__burger')) {
      wrapper.classList.remove('lock');
      body.classList.remove('lock');
      burger.classList.remove('hide');
      menu.classList.remove('open');
    }

    if (targetElement.classList.contains('menu__link', 'menu__text')) {
      var sublist = targetElement.nextElementSibling;

      if (sublist) {
        targetElement.classList.toggle('active');
        menuFirstLink.classList.toggle('disable');
        sublist.classList.toggle('open');

        if (sublist.classList.contains('open')) {
          sublist.style.height = sublist.scrollHeight + 'px';
        } else {
          sublist.style.height = 0;
        }
      }
    }

    if (targetElement.classList.contains('getting__item')) {
      targetElement.classList.add('active');
    }

    if (targetElement.classList.contains('getting__descr') && targetElement.classList.contains('active')) {
      targetElement.closest('.getting__item').classList.remove('active');
    }

    if (!targetElement.classList.contains('getting__descr') && !targetElement.classList.contains('getting__item')) {
      var gettingItems = document.querySelectorAll('.getting__item');

      for (var i = 0; i < gettingItems.length; i++) {
        var gettingItem = gettingItems[i];

        if (gettingItem.classList.contains('active')) {
          gettingItem.classList.remove('active');
        }
      }
    }
  }

  window.addEventListener('scroll', windowScroll);
  var currentScroll;

  function headerFixid() {
    currentScroll = window.pageYOffset;

    var headerFix = function headerFix() {
      return header.classList.contains('fixed');
    };

    if (currentScroll > 0 && !headerFix()) {
      header.classList.add('fixed');
    }

    if (currentScroll == 0 && headerFix()) {
      header.classList.remove('fixed');
    }
  }

  function gettingDisabled() {
    var gettingItems = document.querySelectorAll('.getting__item');

    for (var i = 0; i < gettingItems.length; i++) {
      var gettingItem = gettingItems[i];

      if (gettingItem.classList.contains('active')) {
        gettingItem.classList.remove('active');
      }
    }
  }

  function scrollBy() {
    clientsInner.scrollLeft = 500;
  }

  function windowScroll() {
    headerFixid();
    gettingDisabled();
  }

  scrollBy();
  headerFixid();

  if (innerImage) {
    var innerImageMoved = function innerImageMoved() {
      if (window.innerWidth <= 991.98 && !innerImageClass()) {
        innerImage.classList.add('moved');
        innerImageParents.append(innerImage);
      }

      if (window.innerWidth > 991.98 && innerImageClass()) {
        innerImage.classList.remove('moved');
        innerImagePreParents.append(innerImage);
      }
    };

    var innerImagePreParents = innerImage.closest('.top__body');
    var innerImageParents = innerImagePreParents.querySelector('.top__info');

    var innerImageClass = function innerImageClass() {
      return innerImage.classList.contains('moved');
    };

    innerImageMoved();
    window.addEventListener('resize', function () {
      innerImageMoved();
    });
  }

  ;
});