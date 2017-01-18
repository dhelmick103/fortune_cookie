/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Your patience will soon be greatly rewarded.",
    "hard work pays off in the future.",
    "You cannot love life until you live the life you love.",
    "The greatest risk is not taking one.",
    "Do, or do not.  There is no try.",
    "Stop listening to no and start listening to yes.",
    "Seize the day.",
    "You are the controller of your one destiny.",
    "A journey of a thousand miles begins with a single step.",
    "To be old and wise, you must first be young and stupid.",
    "Integrity is doing the right thing, even if no one is watching.",
    "Do not fear what you do not know.",
    "A big fortune will find you this year.",
    "You cannot change the past but you can change your future.",
    "May life throw you a pleasant curve.",
    "Your many hidden talents will become obvious to those around you.",
    "The time is right to make new friends.",
    "If you continually give, you will continually have.",
    "The first step to better times is to imagine them.",
    "The secret of getting ahead is getting started.",
    "Your past success will be overshadowed by your future success.",
    "Any rough times are behind you.",
    "He who throws dirt is losing ground.",
    "The world may be your oyster, but it doesn't mean you'll get its pearl.",
    "Your hidden talents will soon be revealed.",
    "A great adventure lies ahead.",
    "Life is a garden.  Dig it.",
    "Good luck is the result of good planning.",
    "Your smile lights up the room.",
    "Hard work pays off in the future, laziness pays off now.",
    "Welcome the change coming into your life.",
    "You will travel to many exotic places in your lifetime.",
    "Fear can keep us up all night long, but faith makes one fine pillow.",
    "Meeting adversity well is the source of your strength.",
    "Failure is only the opportunity to begin again more intelligently.",
    "The man on the top of the mountain did not fall there.",
    "Two days from now, tomorrow will be yesterday.",
    "Indecision is key to flexibility.",
    "You are only young once, but can be immature forever.",
    "The fortune you seek is in another cookie.",
    "Avoid taking unnecessary gambles.",
    "Your fortune awaits at the casino.",
    "I cannot help you.  I am just a cookie.",
    "You will soon excel at a new hobby.",
    "A conclusion is simply the place where you got tired of thinking.",
    "A cynic is only a frustrated optimist."
    "He who laughs at himself never runs out of things to laugh at.",
    "He who throws dirt is losing ground.",
    "You will be hungry again in one hour.",
    "I'm on break.  Try another cookie.",
    "Don't behave with cold manners.",
    "You will gain admiration from your peers.",
    "Don't swear the petty things and don't pet the sweaty things.",
    "If opportunity knocks, build a door.",
    "A good beginning is only half done.",
    "A new challenge is near.",
    "A bashful admirer will soon be reveled.",
    "A good example is the best sermon.",
    "A pet will always brighten your day.",
    "A winner never whines.",
    "Alone we can do little, together we can do so much.",
    "Always begin with an end in mind.",
    "Any fool can criticize. Many do.",
    "Bad habits are hard to break, especially if you like them.",
    "Be cautious in your financial dealings.",
    "Be proactive, not reactive.",
    "Be what you wish others to become.",
    "Change before you have to.",
    "Choose a job you love and you will never need to work.",
    "Compliments cost nothing yet can give so much.",
    "Do not rush through life, pause and enjoy it.",
    "Do onto others as you would have them do onto you.",
    "Don't hog your knowledge & wisdom.",
    "Fail to plan and plan to fail.",
    "Failure is success trying to be born.",
    "Fear of failure is the biggest obstacle to success.",
    "For each criticism give four compliments.",
    "Free advice is usually worth what you paid for it.",
    "Good negotiators separate people from problems.",
    "He who knows the most says the least.",
    "Helping a friend is like helping yourself.",
    "Honesty Is The Best Policy.",
    "Hope for the best, but prepare for the worst.",
    "I see a baby in your future.",
    "If you buy what you don't need you steal from yourself.",
    "If you continually give, you will continually have.",
    "If you don't control your destiny someone else will.",
    "If you don't have a competitive edge, don't compete.",
    "In a good business deal everyone wins.",
    "Innovate or evaporate.",
    "Invest, but never speculate.",
    "It is a good time to start something new.",
    "Laughter shortens the distance between people.",
    "Life is a blank canvas. You choose what to paint on it.",
    "Long life is in store for you.",
    "The answer is right in front you.",
    "Make your dreams a reality.",
    "Never throw good money after bad.",
    "Not to decide is a decision.",
    "Now is the time to start something new.",
    "Over deliver. Under promise.",
    "Prosperity will knock on your door soon.",
    "Enjoy the little things.",
    "Take advantage of an unusual opportunity to advance.",
    "Take one day at a time.",
    "The best is yet to come.",
    "The best way to predict the future is to create it.",
    "The current year will bring you much happiness.",
    "The heart has reasons the mind cannot understand.",
    "The only way to have a friend is to be one.",
    "The party always begins when you arrive.",
    "The respect of influential people will soon be yours.",
    "The road to success is always under construction.",
    "The sun is always shining somewhere.",
    "The two hardest things in life are failure and success.",
    "Those who never ask know all, or nothing.",
    "True happiness comes from within.",
    "We all smile in the same language.",
    "Wealth without wisdom is a fool's paradise.",
    "What you decide today will be your good fortune.",
    "Winners never quit. Quitters never win.",
    "You are always the center of attention.",
    "You are next in line for a promotion.",
    "You are only as old as you feel.",
    "You deserve a good time after a hard day of work.",
    "You will find gold among the sand.",
    "You will inherit a large sum of money.",
    "Your circle of friends will soon grow larger.",
    "Your hard work is about to pay off.",
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};
