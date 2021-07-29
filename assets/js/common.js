$(document).ready(function() {
  // 마우스가 문서 영역에서 벗어나면 모달창 띄우기
  $(document).on('mouseleave', function (e) {
    if (e.clientY < 0) {
      
      // 1) 변수선언 : 열기버튼, 열려질 상세 모달 내용, 닫기버튼, 포커스를 처음가질 요소, 포커스를 마지막에 가질 요소
      const $mdCnt = $('#ouibounce-modal');
      const $first = $mdCnt.find('.first');
      const $last = $mdCnt.find('.site_leave');
      const $closeBtn = $mdCnt.find('.close_btn');

      // 2) 현재의 스크롤 그대로 유지 : #wrap 높이값 -> html, body에게 적용
      const wrapHei = $('#wrap').outerHeight();
      $('html, body').css({height: wrapHei, overflow: 'hidden'});

      // 3) 열려진 모달을 제외한 나머지에 스크린리더 접근 제한: aria-hidden, inert
      $mdCnt.siblings().attr({'aria-hidden': true, inert: ''});

      // 4) dim 동적생성후 모달 보여지게 처리 -> 첫번째 요소에 포커스 강제 이동
      $mdCnt.before('<div id="dim"></div>');
      const $dim = $('#dim');
      $dim.stop().fadeIn().next().show().find('.first').focus();

      // 5) 닫기 버튼을 누르기 전까지 포커스 제어 -> 키보드 trapping
      // $first에서 shift+tab => $last강제이동
      $first.on('keydown', function (e) {
        console.log(e.keyCode); //tab => 9
        if (e.shiftKey && e.keyCode === 9) {
          e.preventDefault();  //shift+tab을 누르면 이전 요소에 포커스가 이동해야 하는데 기본 기능을 차단하기 위해 추가
          $last.focus();
        }
      });
      // $last에서 shift(X)+tab => $first 강제이동
      $last.on('keydown', function (e) {
        if (!e.shiftKey && e.keyCode === 9) {
          e.preventDefault();
          $first.focus();
        }
      });

      $closeBtn.on('click', function () {
        // 1) html, body에게 준 높이를 제거 -> removeAttr('style')
        $('html, body').removeAttr('style');
        
        // 2) dim 보이지 않게 숨기고 -> 삭제
        $dim.stop().fadeOut(function () {
          $(this).remove();
        });
        
        // 3-1) 열려진 모달도 숨기기
        // 3-2) 열려진 모달을 제외한 나머지에 스크린리더 접근 허용: aria-hidden, inert을 제거
        $mdCnt.hide().siblings().removeAttr('aria-hidden inert');
    });

      //  esc , #dim 클릭시 닫기버튼과 동일하게 처리
      $dim.on('click', function () {
        $closeBtn.trigger('click');
      });
      
      $(window).on('keydown', function (e) {
        console.log(e.keyCode); //esc => 27
        if (e.keyCode === 27) $closeBtn.click();
      });

      $last.on('click', function () {
        self.close();
      });
    }
  });
});