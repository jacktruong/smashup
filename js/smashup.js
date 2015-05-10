$(document).ready(function() {
    var factions = [];
    factions.push({'name': 'Core Set', 'factions': ['Pirates', 'Ninja', 'Zombies', 'Robots', 'Dinosaurs', 'Wizards', 'Tricksters', 'Aliens']});
    factions.push({'name': 'Awesome Level 9000', 'factions': ['Killer Plants', 'Ghosts', 'Steampunks', 'Bear Cavalry']});
    factions.push({'name': 'Obligatory Cthulhu Set', 'factions': ['Cthulhu Cultists', 'Elder Things', 'Innsmouth', 'Miskatonic University']});
    factions.push({'name': 'Science Fiction Double Feature', 'factions': ['Time Travelers', 'Cyborg Apes', 'Super Spies', 'Shapeshifters']});
    factions.push({'name': 'Big Geeky Box', 'factions': ['The Geeks']});
    factions.push({'name': 'Monster Smash', 'factions': ['Vampires', 'Mad Scientists', 'Giant Ants', 'Werewolves']});
    factions.push({'name': 'Pretty Pretty Smash Up', 'factions': ['Fairies', 'Mythic Horses', 'Kitty Cats', 'Princesses']});

    var make_id = function(string) {
        return string.toLowerCase().replace(/[^a-z]+/g, '_');
    }
    var myfactions = {};
    for(i = 0; i < factions.length; i++) {
        var currentFactionGroup = $('<div/>').addClass('col-md-3 col-xs-12');
        var expansionSet = $('<div/>').addClass('checkbox');
        var expansionSetLabel = $('<label/>').append($('<input/>', {type: 'checkbox', value: i, id: make_id(factions[i].name), checked: "checked", class: 'expansion-choice'})).append(factions[i].name);
        expansionSet.append(expansionSetLabel);
        currentFactionGroup.append(expansionSet);
        for(j = 0; j < factions[i].factions.length; j++) {
            myfactions[factions[i].factions[j]] = true;
            var currentFaction = $('<div/>').addClass('checkbox').addClass('faction-list');
            var currentCheckbox = $('<input/>', {type: 'checkbox', value: factions[i].factions[j], id: make_id(factions[i].factions[j]), checked: "checked", class: 'faction-choice'});
            var currentLabel = $('<label/>').append(currentCheckbox).append(factions[i].factions[j]);
            currentFaction.append(currentLabel);
            currentFactionGroup.append(currentFaction);
        }
        $('#factions').append(currentFactionGroup);
    }
    $('.faction-choice').change(function() {
        myfactions[$(this).val()] = !myfactions[$(this).val()];
        console.log($(this).parentsUntil('.col-xs-12').children('div').html());
    });

    $('.expansion-choice').change(function() {
        var curFac = factions[$(this).val()];
        var checked = $(this).prop("checked");
        for(i = 0; i < curFac.factions.length; i++) {
            myfactions[curFac.factions[i]] = checked;
        }
        $(this).parent().parent().parent().children('.faction-list').children('label').children(':checkbox').prop("checked", checked);
    });
});