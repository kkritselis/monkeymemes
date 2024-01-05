let intro = 0;
let monkeys = [];

let Monkey = function (name, personality, actionState, emotionState, text, quote, stateChange) {
  this.actionState = actionState;
  this.emotionState = emotionState;
  this.stateChange = stateChange;
  this.name = name;
  this.personality = personality;
  this.text = text + "~" + quote;
  this.quote = quote;
  this.stamina = 100;
}

// create first monkey
monkeys.push(
  new Monkey(
    monkeyName[Math.floor(Math.random() * monkeyName.length)],
    Math.random() * 1.5,
    "waiting",
    "happy",
    getGibber(),
    quotes[Math.floor(Math.random() * quotes.length)],
    Date.now()
  )
);

monkeys.push(new Monkey(monkeyName[Math.floor(Math.random() * monkeyName.length)], Math.random() * 1.5, "waiting", "happy", getGibber(), quotes[Math.floor(Math.random() * quotes.length)], Date.now()));


console.log(monkeys);

function getGibber() {
  let texty = "";
  let gibCount = Math.floor(Math.random() * 100) + 50;
  for (x = 0; x < gibCount; x++) {
    if (x % 21 == 20) {
      texty += "|";
    } else {
      texty += String.fromCharCode(Math.floor(Math.random() * 85) + 30);
    }
  };
  return texty;
};


$(document).ready(function () {
  // insert first monkey in the DOM
  monkeys.forEach(function (item, index) {
    $("#container").append(function () {
      return "<div class='desk' id='desk" + index + "'><img src='img/chair.svg'><img id='monkanim" + index + "' src='img/typing1.svg'><img src='img/typewriter.svg'><img src='img/table.svg'><span>" + monkeys[index].name + "</span><div></div></div>";
    });

  });

  setInterval(goGo, 333);

  $(".desk").click(function () {
    monkeys[$(this).index()].actionState = "typing";
    $($(this).children("div")[0]).addClass("page");
  });

  function goGo() {
    monkeys.forEach(function (item, index) {
      if (monkeys[index].actionState == "typing") {
        var curLet = monkeys[index].text[0];

        if (curLet == "~") {
          $("#desk" + index + " div").append(" <br> <b> ");
        } else if (curLet == "|") {
          $("#desk" + index + " div").append("<br>");
        } else {
          $("#desk" + index + " div").append(monkeys[index].text[0]);
        }
        monkeys[index].text = monkeys[index].text.slice(1);
        console.log(monkeys[index].text.length);
        if (monkeys[index].text.length == 0) {
          monkeys[index].actionState = "waiting";
          console.log(".desk" + index);
          $("#desk" + index).children("div").removeClass("page");
          $("#desk" + index).children("div").addClass("pageFull");
        }
        // animate monkey
        $("#monkanim" + index).attr("src", "img/typing" + (Date.now() + index) % 3 + ".svg");
      }
    });
  };



  // game introduction

  $("#modal").click(function () {
    intro++;

    switch (intro) {
      case 1:
        // code block
        $("#modal img").attr("src", "img/pitch.svg");
        $("#text1").text("I only have a couple minutes before my next meeting, but I guess I can hear a quick pitch... What's your startup idea?");
        $("#text2").text("Are you familiar with the Infinite Monkey Theorem?");

        break;
      case 2:
        // code block
        $("#text1").text("Never heard of it... but I am intrigued...");
        $("#text2").text("The theorem states that a monkey hitting random keys on a typewriter for an infinite amount of time will almost surely type any given text.");
        break;
      case 3:
        // code block
        $("#text1").text("Huh... any text...?");
        $("#text2").text("Yes sir, all the way up to and including the complete works of William Shakespeare.");
        break;
      case 4:
        // code block
        $("#text1").text("Fascinating...!");
        $("#text2").text("Indeed!  But the thing is... Shakespeare is long and boring and even if that monkey did type it out, no one would read it. But you know what they do read?");
        break;
      case 5:
        // code block
        $("#text1").text("What's that?");
        $("#text2").text("Memes!  People love memes!  And the best thing about them is that they're short... which makes them easy to type for monkeys and easy to read for people!");
        break;
      case 6:
        // code block
        $("#text1").text("OK, I think I see where you're going with this...");
        $("#text2").text("I want to train an army of monkeys to create infinite streams of internet memes!");
        break;
      case 7:
        // code block
        $("#text1").text("Oh, that is not where I thought you were going with that... but I guess that could work too...");
        $("#text2").text("Does that mean you'll back me?");
        break;
      case 8:
        // code block
        $("#text1").text("Sure, what the hell, I passed on AirBnB and this idea isn't half as crazy as that one... I mean people paying to sleep on air mattresses in your living room");
        $("#text2").text("Thank you sir, this means so much that you would invest your hard earned money in my idea...");
        break;
      case 9:
        // code block
        $("#text1").text("Oh, it's not my money, I represent a group of international investors");
        $("#text2").text("International?  Where are they from?");
        break;
      case 10:
        // code block
        $("#text1").text("Oh, that's not important... I think we should start small... with just one monkey to prove the concept.");
        $("#text2").text("...Ok.......");
        break;
      default:
        // code block
        $("#modal").toggle();
        $("#bananaCount").animate({
          left: "+=75",
          top: "+=75"
        }, 1000, function () {
          // Animation complete.
        });
        $("#mercado").animate({
          right: "+=75",
          top: "+=75"
        }, 1000, function () {
          // Animation complete.
        });
        $("#stats").animate({
          left: "+=75",
          bottom: "+=75"
        }, 1000, function () {
          // Animation complete.
        });
        $("#title").animate({
          top: "+=50"
        }, 1000, function () {
          // Animation complete.
        });
    }
  });
});
