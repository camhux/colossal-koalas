var home = angular.module('greenfeels.home', ['ngAnimate']);

// home.animation('.fade', [function() {
//   return {
//     enter: function(element, done) {
//       Velocity(element, 'fadeIn', {duration: 400}, {complete: done});
//     },
//     leave: function(element, done) {
//       Velocity(element, {opacity: 0, duration: 300});
//       Velocity(element, 'slideUp', {duration: 500}, {complete: done});
//     }
//   }
// }]);

home.controller('HomeController', ['$scope', '$state', '$animate', 'Prompts', 'Entries', 'Twemoji',
  function($scope, $state, $animate, Prompts, Entries, Twemoji) {
    // Expose our Twemoji service within the scope.
    // This is used to conveniently generate the `src`
    // attributes of the <img> tags within the buttons.
    $scope.getTwemojiSrc = Twemoji.getTwemojiSrc;

    $state.transitionTo('home.initial');
    // Upon load, initialize first prompt. Display of this prompt will depend on the state.
    // Cache the initial prompt in case we want to return to this state.
    // var initPrompt = Prompts.getFirstPrompt();
    $scope.initialPrompt = Prompts.getFirstPrompt();

    // Initialize a blank model for the entry.
    $scope.entry = {};

    // Handler for clicking on an emoji on the spectrum. Transitions state, changes to new prompt,
    // and captures the code of the selected emotion on the tentative entry model.
    $scope.selectHandler = function($event) {
      $state.transitionTo('home.selected');
      clearSelectedStates();
      var emotion = $event.currentTarget.attributes['data-emotion-id'].value;
      $event.currentTarget.classList.add('selected-emoji');
      $scope.entry.emotion = emotion;
      $scope.secondPrompt = Prompts.getSecondPrompt(emotion);
    };

    $scope.submit = function() {
      // TODO: Use submit service to submit the entry to the server
      Entries.addEntry(JSON.stringify($scope.entry));
      $scope.entry = {};
      $state.transitionTo('journal');
    };

    function clearSelectedStates() {
      var selected = document.getElementsByClassName('selected-emoji');
      for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected-emoji');
      }
    }

  }]);
