$(function(){
  // セレクトボタンの値が変更された時
  $('.select-box').on('change', function(){
    // .select-boxの値を取得しcategoryに代入
    const category = $(this).val();
    // .food-list liに登録された値を取得
    const foodList = $('.food-list li');
    // 全てを選択している時、
    if('all' === category){
      // カテゴリーを全て表示する
      foodList.show();
      // 全てを選択していない時
    }else{
      // foodListのkeyに取得、listValにlistの値を取得
      $.each(foodList, function(key, listVal){
        // listNameに選択されたカテゴリーのタイプを代入する
        const listName = $(listVal).data('category-type');
        // categoryとlistNameが同じ場合
        if(category === listName){
          // 選択されたlistを表示
          $(listVal).show();
        }else{
          // 選択されたカテゴリーと異なるリストは表示しない
          $(listVal).hide();
        }
      })
    }
  })
})