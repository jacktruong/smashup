$(document).ready(function() {
    var players =   [
                        {name:'', factions:['','','']},
                        {name:'', factions:['','','']},
                        {name:'', factions:['','','']},
                        {name:'', factions:['','','']}
                    ];
    var factions = [];
    factions.push({'name': 'Core Set', 'factions': ['Pirates', 'Ninja', 'Zombies', 'Robots', 'Dinosaurs', 'Wizards', 'Tricksters', 'Aliens']});
    factions.push({'name': 'Awesome Level 9000', 'factions': ['Killer Plants', 'Ghosts', 'Steampunks', 'Bear Cavalry']});
    factions.push({'name': 'Obligatory Cthulhu Set', 'factions': ['Cthulhu Cultists', 'Elder Things', 'Innsmouth', 'Miskatonic University']});
    factions.push({'name': 'Science Fiction Double Feature', 'factions': ['Time Travelers', 'Cyborg Apes', 'Super Spies', 'Shapeshifters']});
    factions.push({'name': 'Big Geeky Box', 'factions': ['The Geeks']});
    factions.push({'name': 'Monster Smash', 'factions': ['Vampires', 'Mad Scientists', 'Giant Ants', 'Werewolves']});
    factions.push({'name': 'Pretty Pretty Smash Up', 'factions': ['Fairies', 'Mythic Horses', 'Kitty Cats', 'Princesses']});
    factions.push({'name': 'Munchkin', 'factions': ['Warriors', 'Clerics', 'Mages', 'Rogues', 'Orcs', 'Dwarves', 'Elves', 'Halflings']});
    factions.push({'name': 'It\'s Your Fault', 'factions': ['Dragons', 'Mythic Greeks', 'Superheroes', 'Sharks']});
    factions.push({'name': 'Cease & Desist', 'factions': ['Astroknights', 'Star Roamers', 'Changerbots', 'Ignobles']});

    var make_id = function(string) {
        return string.toLowerCase().replace(/[^a-z]+/g, '_');
    }
    for(i = 0; i < factions.length; i++) {
        var currentFactionGroup = $('<div/>').addClass('col-md-3 col-xs-12 factionGroup');
        var expansionSet = $('<div/>').addClass('checkbox');
        var expansionSetLabel = $('<label/>').append($('<input/>', {type: 'checkbox', value: i, id: factions[i].name, checked: "checked", class: 'expansion-choice'})).append(factions[i].name);
        expansionSet.append(expansionSetLabel);
        currentFactionGroup.append(expansionSet);
        for(j = 0; j < factions[i].factions.length; j++) {
            var currentFaction = $('<div/>').addClass('checkbox').addClass('faction-list');
            var currentCheckbox = $('<input/>', {type: 'checkbox', value: factions[i].factions[j], id: factions[i].factions[j], checked: "checked", class: 'faction-choice'});
            var currentLabel = $('<label/>').append(currentCheckbox).append(factions[i].factions[j]);
            currentFaction.append(currentLabel);
            currentFactionGroup.append(currentFaction);
        }
        $('#factions').append(currentFactionGroup);
    }
    $('.faction-choice').change(function() {
        // check if all items are checked under the parent
    });

    $('.expansion-choice').change(function() {
        var curFac = factions[$(this).val()];
        var checked = $(this).prop("checked");
        $(this).closest('div.factionGroup').find(':checkbox').prop("checked", checked);
    });

    $('.clear-team').click(function() {
        $(this).closest('.input-group').find(':text').val('');
    });

    $('form').submit(function(event) {
        event.preventDefault();
    });

    $('#settings-toggle').hide();
    $('#not-enough-factions').hide();
    $('#not-enough-players').hide();
    $('#scoring > div').hide();

    // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        var currentIndex = array.length
          , temporaryValue
          , randomIndex
          ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $('#randomize').click(function() {
        // check if there are enough factions for # players
        $('#not-enough-factions').hide();
        $('#not-enough-players').hide();
        $('#scoring > div').hide();
        players =   [{name:'', factions:['','','']}, {name:'', factions:['','','']}, {name:'', factions:['','','']}, {name:'', factions:['','','']} ];
        var dup = $('#duplicate_faction').filter(':checked').length;
        var three = $('#three_teams').filter(':checked').length;
        var fac = $('.faction-choice').filter(':checked').length;
        var numPlayer = $('.team-name').filter(function() { return $(this).val() !== ''; }).length;
        if(fac + dup * fac < numPlayer * (2 + three)) {
            $('#not-enough-factions').show();
        } else if(numPlayer < 2) {
            $('#not-enough-players').show();
        } else {
            // randomize the up to 4 players
            $('#settings').slideToggle(200, function() {$('#settings-toggle').slideToggle(200);});
            $('#update').removeProp('disabled');
            $('#cancel').removeProp('disabled');

            var impossible = true;
            while(impossible) {
                var actualNumFactions = fac + fac * dup;
                //console.log('loop');
                impossible = false;
                var listOfFactions = [];
                for(i = 0; i <= dup; i++) {
                    $('.faction-choice').filter(':checked').each(function() {
                        listOfFactions.push($(this).val());
                    });
                }
                shuffle(listOfFactions);
                $('.team-name').filter(function() { return $(this).val() !== ''; }).each(function(ix) {
                    var index = $(this).data('team')-1;
                    players[index].name = $(this).val();
                    var rand = Math.floor((Math.random() * actualNumFactions));
                    players[index].factions[0] = listOfFactions.splice(rand,1)[0];
                    actualNumFactions--;
                    // 2nd
                    while(true) {
                        rand = Math.floor((Math.random() * actualNumFactions));
                        // if the last choice is the same as the other choice, repeat the whole thing
                        if(listOfFactions[rand] == players[index].factions[0] && actualNumFactions == 1) {
                            impossible = true;
                            break;
                        }
                        if(listOfFactions[rand] !== players[index].factions[0]) {
                            break;
                        }
                    }
                    players[index].factions[1] = listOfFactions.splice(rand,1)[0];
                    actualNumFactions--;
                    
                    // 3rd
                    if(!impossible && three) {
                        while(true) {
                            rand = Math.floor((Math.random() * actualNumFactions));
                            // if the last choice is the same as the other choice, repeat the whole thing
                            if((listOfFactions[rand] == players[index].factions[0] || listOfFactions[rand] == players[index].factions[1]) && actualNumFactions == 1) {
                                impossible = true;
                                break;
                            }
                            if(listOfFactions[rand] !== players[index].factions[0] && listOfFactions[rand] !== players[index].factions[1]) {
                                break;
                            }
                        }
                        players[index].factions[2] = listOfFactions.splice(rand,1)[0];
                        actualNumFactions--;
                    }
                    $('#scoring > div:eq('+ix+') .panel-heading').html(players[index].name);
                    if(three > 0) {
                        $('#scoring > div:eq('+ix+') .panel-body').html(players[index].factions[0] + ' / ' + players[index].factions[1] + ' / ' + players[index].factions[2]);
                    } else {
                        $('#scoring > div:eq('+ix+') .panel-body').html(players[index].factions[0] + ' / ' + players[index].factions[1]);
                    }
                });
            }
            $('#scoring > div:lt('+numPlayer+')').show();

        }

    });

    $('#update').click(function() {
        // update/remove players?
    });

    $('#cancel').click(function() {
        // revert all players back to the stored array value
    })

    $('#display-settings').click(function() {
        $('#settings-toggle').slideToggle(200, function() {$('#settings').slideToggle(200);});
    });
});