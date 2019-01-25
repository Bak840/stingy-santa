class Quiz {
    constructor(quizContainer) {
        this.quizContainer = quizContainer;
        this.questions = [
            {
                question: "Javascript est un langage?",
                answers: {
                    a: 'Compilé',
                    b: 'Interprété',
                },
                correctAnswer: 'b'
            },
            {
                question: "Comment déclarer un entier?",
                answers: {
                    a: 'let nb = 5;',
                    b: 'int nb = 5;',
                },
                correctAnswer: 'a'
            },
            {
                question: "Qu'est ce qui va s'afficher si on entre : console.log( true + '1')",
                answers: {
                    a: 'true1',
                    b: '11',
                },
                correctAnswer: 'a'
            }
        ];
    }

    show() {
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for (var i = 0; i < this.questions.length; i++) {

            // first reset the list of answers
            answers = [];

            // for each available answer to this question...
            for (let letter in this.questions[i].answers) {

                // ...add an html radio button
                answers.push(
                    '<label>'
                    + '<input type="radio" name="question' + i + '" value="' + letter + '">'
                    + letter + ': '
                    + this.questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + this.questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        this.quizContainer.innerHTML = output.join('');
    }

    checkResults() {
        // gather answer containers from our quiz
        var answerContainers = this.quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // for each question...
        for (var i = 0; i < 3; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

            // if answer is correct
            if (userAnswer === this.questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        if(numCorrect===3){
            return true;
        }
        else{
            return false;
        }
    }
}