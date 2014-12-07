var questionFaders = $('.question-fade-in');
var answerFaders = $('.answer-fade-in');


var fadeIn = function(faders, index, timeout) {
  $(faders[index]).addClass('faded-in');
  if(index < faders.length) {
    setTimeout(function() { fadeIn(faders, index+1, timeout); }, timeout);
  }
};

setTimeout(function() { fadeIn(questionFaders, 0, 1500); }, 1000);

$('button.btn-whats-wrong').on('click', function() {
  $.get('/whatswrong', function(data) {
    whats_wrong = $('.whats-wrong')
    question = $('.question');

    if(question.is(':visible')) {
      whats_wrong.html(data)
      question.fadeOut(function() {
        fadeIn(answerFaders, 0, 750);
      });
    }
    else {
      whats_wrong.removeClass('faded-in');
      setTimeout(function() {
        whats_wrong.html(data)
        whats_wrong.addClass('faded-in');
      }, 750);
    }
  });
})
