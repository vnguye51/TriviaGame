var timer = {
    timerID: null,
    timeLeft: 30,

    updateTime: function(){
        timer.timeLeft--;
        $('#time').html('Time Left: ' + timer.timeLeft);

        if (timer.timeLeft == 0){
            timer.timeLeft = 30
            game.checkAnswer('')
        }
    }
}

var game = {
    score: 0,
    possibleScore: 0,
    index : 0,
    choices : null,
    choiceSets :    [['100 Million Years','2','3','4'],['1.','2.','3.','4.'],['1.','Fungus','3.','4.'],
                    ['1.','2.','3.','Female'],['45-60 days','2.','3.','4.'],['A Macintosh II Computer','2.','3.','4.'],
                    ['30 years','2.','3.','4.'],['1.','Caterpillars','3.','4.'],['1.','2.','3.','4.'],
                    ['1.','2.','3.','4.']],
    questions : ['How long have ants existed on Earth?','How large is the largest colony of ants?','What do carpenter ants eat?','What sex are worker ants?','What is the lifespan of a worker?',"What is the estimated processing power of an ant's brain","How long can an ant queen live?",'What species of insects have ants "domesticated"?','What is the largest animal an ant has been recorded eating?','How many ants are estimated to live in the world?'],
    answers : [1,2,3,4,1,1,1,1,1,1],

    finish: function(){
        clearInterval(timer.timerID)
        $('#restart').removeAttr('hidden')
        $('#question').attr('hidden',true)
        $('#image').attr('src','https://i0.wp.com/www.betameme.com/wp-content/uploads/2018/02/congratulations-meme.jpg?resize=397%2C293')
        $('#correct').html(this.score + '/' + this.possibleScore)
    },

    nextQuestion: function(){
        game.possibleScore++
        if(game.index < 9){
            game.index++;
            timer.timeLeft = 30;
            $('#question').html(game.questions[game.index])
            $('#correct').attr('hidden',true)
            $('#image').attr('hidden',true)
            $('.choice').removeAttr('hidden')
            $('#time').removeAttr('hidden')
            game.populateChoices()
        }
        else{
            game.finish()
        }
    },
    checkAnswer: function(choice){
        $('.choice').attr('hidden',true)
        $('#time').attr('hidden',true)
        $('#correct').removeAttr('hidden')
        $('#image').removeAttr('hidden')
        setTimeout(game.nextQuestion,2000)
        if (choice == ''){
            $('#image').attr('src','https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif')
            $('#correct').html("TIME'S UP")

        }
        else if (choice == this.answers[this.index]){
            $('#image').attr('src','https://media1.giphy.com/media/l41lZxzroU33typuU/giphy.gif')
            $('#correct').html('CORRECT')
            this.score++
        }
        else{
            $('#image').attr('src','https://media0.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif')
            $('#correct').html('WRONG')
        }
    },

    start: function(){
        game.score = 0
        game.possibleScore = 0
        game.index = 0
        game.populateChoices()
        timer.timeLeft = 30
        timer.timerID = setInterval(timer.updateTime,1000)
        $('#restart').attr('hidden',true)
        $('#image').attr('hidden',true)
        $('#correct').attr('hidden',true)
        $('#time').removeAttr('hidden')
        $('.choice').removeAttr('hidden')
        $('#time').html('Time Left: ' + timer.timeLeft)
        $('#question').html(this.questions[this.index])
    },

    populateChoices: function(){
        this.choices = this.choiceSets[this.index]
        for(var i=1;i<5;i++){
            $('#choice' + i).html(this.choices[i-1])
        }
    }
}
    
$('.choice').on('click',function(){
    game.checkAnswer(+$(this).attr('value'))
})

$('#restart').on('click',function(){
    game.start()
})

game.start()