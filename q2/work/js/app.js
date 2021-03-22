$(function(){
  // ボタンをクリックした時
  $('.modal_open_button').on('click', function(){
    // モーダルウィンドを表示する
    $('.modal_win').fadeIn();
    // 新しい表示をしないようにするために記述
    return false;
  });
  // ×を押した時に
  $('.modal_close_button').on('click', function(){
    // モーダルウィンドを閉じる
    $('.modal_win').fadeOut();
    // 閉じる操作を引き続き起こさないように記述
    return false;
  });
});