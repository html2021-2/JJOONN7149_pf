// 언어팩 선언.
$.lang = {};

$.lang.ko = {
	1: '안녕하세요',
	2: '오늘은 금요일 입니다.',
	3: '불금을 즐겨 보아요.'
};

$.lang.en = {
	1: 'Hello.',
	2: 'Today is Friday', 
	3: 'Fire~!!'
};

/**
* setLanguage 
* use $.lang[currentLanguage][languageNumber]
*/
function setLanguage(currentLanguage) {
  console.log('setLanguage', arguments);
  
  $('[data-langNum]').each(function() {
    var $this = $(this); 
    $this.html($.lang[currentLanguage][$this.data('langnum')]); 
  });	
}  

// 언어 변경
$('button').click(function() {
  var lang = $(this).data('lang');
  setLanguage(lang); 
});

/*
추가적으로 유용한 처리.
1. 브라우저 언어에 따라 최초 언어 셋팅하기
2. 외부에서 URL ?lang=ja 접근시 셋팅하기*/