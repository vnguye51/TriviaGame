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
    choiceSets :    [['Two men arguing', 'Two frogs mating', 'A rabbit', 'A crying kid'],['Left', 'Right', 'Ambidextrous'],['Breath of the Wild', 'Skyward Sword', 'The Legend of Zelda', 'Ocarina of Time'],
                    ['Zelda Williams','Zelda Fitzgerald','Zelda Spellman', 'Zelda Wynn Valdez'],['6','7','8','9'],['Koji Kondo', 'Shigeru Miyamoto', 'Tekashi Tezuka', 'Eiji Aonuma'],
                    ['clowns','aliens','yetis','zombies'],['Kevin Hart', 'Robin Williams', 'Tom Cruise', 'Jackie Chan'],['Indiana Jones', 'Star Wars', 'Wizards', 'Snow White and the Seven Dwarves'],
                    ['Four Swords', 'The Minish Cap', 'Skyward Sword', 'The Legend of Zelda']],
    questions : ['In Wind Waker what is the voice of a Chu Chu recorded from?','Is Link typically depicted as left or right-handed?',
    'The timeline for the games were officially broken into three branches starting at which game?',
    "Who is Zelda named after?",'Excluding remakes and the CD-i games how many times has Link fought Ganon or Ganondorf)?',"Who created The Legend of Zelda series?","What did Breath of the Wild almost have?",
    "Who named his daughter after Zelda?",'What movie gave inspiration to the Legend of Zelda?','Which one of these games is chronologically last?'],
    answers : [1,1,4,2,4,2,2,2,1,4],

    finish: function(){
        clearInterval(timer.timerID)
        $('#restart').removeAttr('hidden')
        $('#question').attr('hidden',true)
        $('#image').attr('src','assets/images/End.gif')
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
        setTimeout(game.nextQuestion,2500)
        
        if (choice == ''){
            $('#image').attr('src','assets/images/Fail' + (game.index+1) + '.gif')
            $('#correct').html("TIME'S UP")

        }
        else if (choice == this.answers[this.index]){
            $('#image').attr('src','assets/images/Success' + (game.index+1) + '.gif')
            $('#correct').html('CORRECT')
            this.score++
        }
        else{
            $('#image').attr('src','assets/images/Fail' + (game.index+1) + '.gif')
            $('#correct').html('WRONG')
        }
        console.log($('#image').attr('src'))
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
            $('#choice' + i).html(i + '.\t' + this.choices[i-1])
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