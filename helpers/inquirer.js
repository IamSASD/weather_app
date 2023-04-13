import colors from 'colors';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option',
        choices: [
                    {
                        value: 1,
                        name: `${'1. '.green}Search City`
                    },
                    {
                        value: 2,
                        name: `${'2. '.green}History`
                    },
                    {
                        value: 0,
                        name: `${'3. '.green}Exit`
                    }
                ]
    }
];

export const inquirer_menu = async() => {
    console.clear();
    console.log('======================='.cyan);
    console.log('   Choose an option    '.green)
    console.log('=======================\n'.cyan);

    const {option} = await inquirer.prompt(questions)
    return option;
}

export const input_description = async(message) => {
    const {description} = await inquirer.prompt([{
        type: 'input',
        name: 'description',
        message,
        validate(value) {
            if(value.length === 0) {return "Please write a description"} 
            return true;
        }
    }]);
    return description;
}

export const list_places = async(choices) => {
    choices.unshift({value: 0, name: `${'0.'.green} Cancelar`})
    const {id} = await inquirer.prompt([{
        type: 'list',
        name: 'id',
        message: 'Select a place: ',
        choices
    }]);
    return id;
}

export const delete_task_prompt = async(choices) => {
    const {remove} = await inquirer.prompt([{
        type: 'checkbox',
        name: 'remove',
        message: 'Delete task(s): ',
        choices
    }]);
    return remove;
}

export const pause = async() => {
    console.log('\n')
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]);
}

