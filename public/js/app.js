var questionFaders = $('.question-fade-in');
var answerFaders = $('.answer-fade-in');

var fadeIn = function(faders, index, timeout) {
  $(faders[index]).addClass('faded-in');
  if(index < faders.length) {
    setTimeout(function() { fadeIn(faders, index+1, timeout); }, timeout);
  }
};
setTimeout(function() { fadeIn(questionFaders, 0, 1000); }, 1000);

var whatsWrong = function(whatsWrong) {
  whats_wrong = $('.whats-wrong')
  question = $('.question');
  overlay = $('.overlay');
  shoshiInput = $('.shoshi-input');

  shoshiInput.val('');
  overlay.fadeOut(function() {
    if(question.is(':visible')) {
      whats_wrong.html(whatsWrong)
      question.fadeOut(function() {
        fadeIn(answerFaders, 0, 600);
      });
    }
    else {
      whats_wrong.removeClass('faded-in');
      setTimeout(function() {
        whats_wrong.html(whatsWrong)
        whats_wrong.addClass('faded-in');
      }, 750);
    }
  });
}

$('button.btn-whats-wrong').on('click', function() {
  $.get('/whatswrong', whatsWrong);
})

$('button.thats-whats-wrong').on('click', function() {
  $.post('/thatswhatswrong', {description: $('.shoshi-input').val()}, whatsWrong);
});

$('button.i-have-one').on('click', function() {
  $('.overlay').fadeIn();
});

$('button.i-dont-have-one').on('click', function() {
  $('.overlay').fadeOut();
});

$('button.approve-whats-wrong').on('click', function() {
  row = $(this).closest('tr');
  $.post('/approvewhatswrong', {id: $(this).data('id')}, function() {
    row.fadeOut();
  });
});

$('button.reject-whats-wrong').on('click', function() {
  row = $(this).closest('tr');
  $.post('/rejectwhatswrong', {id: $(this).data('id')}, function() {
    row.fadeOut();
  })
});
