const Griffin = {
    health: 2000,
    defence: 120,
    strength: 150,
    weapon: 0,
    changeHealth: function(damage) {

        this.health += damage;
    },
    getStatus: function() {

        return `Грифон: ${this.health} HP\n`;
    },
    fly: function() {

        console.log('Грифон решил просто полетать... и не нападает.');
    },
    attack: function(someone) {

        const damage = this.strength + this.weapon - someone.defence;

        const random = Math.floor(1 + Math.random() * 4);

        if (random !== 4) {

            if (damage > someone.health) {

                someone.changeHealth(-someone.health);

            } else {

                someone.changeHealth(-damage);
            };

            console.log(`Удачная атака.\n` +
                `Грифон нанёс ${+damage} урона!\n` +
                `${someone.getStatus()}`);

        } else {

            console.log('Грифон промахнулся...')
        };
    },
};

const Witcher = {
    health: 1000,
    defence: 100,
    strength: 120,
    weapon: 250,
    getRandomNumber: function(min, max) {

        const randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
        return randomNumber;
    },
    changeHealth: function(damage) {

        this.health += damage;

    },
    getStatus: function() {

        return `Ведьмак: ${this.health} HP\n`;
    },
    drinkSwallow: function() {

        const random = this.getRandomNumber(100, 200);
        this.changeHealth(random);
        return random;
    },
    attack: function(someone) {

        const damage = this.strength + this.weapon - someone.defence;

        const random = this.getRandomNumber(1, 4);

        if (random !== 4) {

            if (damage > someone.health) {

                someone.changeHealth(-someone.health);

            } else {

                someone.changeHealth(-damage);
            };

            console.log(`Удачная атака.\n` +
                `Ведьмак нанёс ${+damage} урона!\n` +
                `${someone.getStatus()}`);

        } else {

            console.log('Ведьмак промахнулся.')
        };
    },
    getIgniDamage: function() {

        const ingiDamage = this.getRandomNumber(150, 200);
        return ingiDamage;
    },
    useIngi: function(someone) {

        const damage = this.getIgniDamage();

        if (damage > someone.health) {

            someone.changeHealth(-someone.health);

        } else {

            someone.changeHealth(-damage);
        };

        console.log(`Ведьмак применил знак "Инги"...\n` +
            `Тем самым нанёс ${+damage} урона!\n` +
            `${someone.getStatus()}`);

    },
    listenToButtercup: function() {

        const buttercupThoughts = [
            "Хватит валять дурака, пора уже тушить пожар в этой программе.",
            "Говорят, грифон никогда не наступит на лежащего ведьмака.",
            "Когда скромняга бард, отдыхал от дел, с Геральтом из Ривии,\nон песню эту пел...",
            "Трус умирает сто раз. Мужественный человек – лишь однажды.",
            "Людям для жизни необходимы три вещи: еда, питье и сплетни."
        ];

        const index = this.getRandomNumber(0, buttercupThoughts.length - 1);

        console.log(`Ведьмак решил послушать "Лютика"...\n` +
            `И вот что он услышал:\n"${buttercupThoughts[index]}"`);
    },
    escapeFromButtle: function(someone) {

        console.log(`Ведьмак бежал с поля боя...\n` +
            `${this.getStatus()}${someone.getStatus()}`);
    }
};

const GriffinVsWitcherGame = {
    griffin: Griffin,
    witcher: Witcher,
    getAndValidateInput: function(message) {

        while (true) {

            const input = prompt(message);

            if (input === null) {

                return null;

            } else if (!isNaN(parseInt(input))) {

                let number = parseInt(input);

                if (number >= 1 && number <= 5) {

                    return parseInt(input);
                };
            };
        };
    },
    switchActions: function(action) {

        switch (action) {
            case 1:

                this.witcher.attack(this.griffin);
                break;

            case 2:

                this.witcher.useIngi(this.griffin);
                break;

            case 3:

                this.witcher.listenToButtercup();
                break;

            case 5:

                console.log(`Ведьмак выпил зелье,\n` +
                    `его HP увеличилось на ${this.witcher.drinkSwallow()}\n` +
                    `${this.witcher.getStatus()}`);
                break;

            default:
                break;
        };
    },
    runBattle: function() {

        const border = '='.repeat(64);
        const thinBorder = '-'.repeat(64);
        let round = 1;

        console.log(`${'-'.repeat(4)} Битва Ведьмака c Грифоном ${'-'.repeat(4)}\n` +
            `${thinBorder}\n` +
            `${this.witcher.getStatus()}${this.griffin.getStatus()}`);

        while (this.witcher.health > 0 || this.griffin.health > 0) {

            if (this.witcher.health > 0) {

                console.log(`${border}\n` +
                    `${'-'.repeat(4)} Раудн № ${round} ${'-'.repeat(4)}`);

                console.log('Ход Ведьмака...');

                const action = this.getAndValidateInput('Ход Ведьмака.\n' +
                    'Выберите действие:\n' +
                    '1 - Атаковать,\n' +
                    '2 - Использовать знак "Игни",\n' +
                    '3 - Послушать "Лютика"\n' +
                    '4 - Убежать\n' +
                    '5 - Выпить эликсир "Ласточка".');

                if (action === null) {

                    break;

                } else if (action === 4) {

                    this.witcher.escapeFromButtle(this.griffin);
                    break;

                } else {

                    this.switchActions(action);
                    console.log(`${thinBorder}\n`);
                };


            } else {

                console.log('Ведьмак убит...');
                break;
            }

            if (this.griffin.health > 0) {

                console.log('Ход Грифона...');

                const randomCase = Math.floor(Math.random() * 2);

                if (randomCase === 1) {

                    this.griffin.attack(this.witcher);

                } else {

                    this.griffin.fly();
                };

                console.log(`${thinBorder}\n`);

            } else {

                console.log('Грифон повержен! Ведьмак победил...');
                break;
            };

            console.log(`${this.witcher.getStatus()}${this.griffin.getStatus()}`);
            round++;
        };

        console.log(`${'-'.repeat(4)} Конец игры ${'-'.repeat(4)}\n`);
    }
};

GriffinVsWitcherGame.runBattle();