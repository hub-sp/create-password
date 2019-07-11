#!/usr/bin/env node

const { prompt } = require('inquirer');
const create = require('.');
const arg = require('arg');

async function run(argv = process.argv.slice(2)) {
  const questions = [];
  const args = arg(
    {
      '--length': Number,
      '--chars': String,
      '-l': '--length',
      '-c': '--chars'
    },
    { argv }
  );
  if (!args['--length'] || create.round(args['--length']) < 1) {
    questions.push({
      name: 'length',
      type: 'input',
      message: 'Length of password?',
      validate(val) {
        if (isNaN(Number(val))) return 'Enter a number';
        let value = create.round(Number(val));
        if (value > 0) return true;
        return 'Length must be greater than zero';
      },
      transformer(val) {
        const rounded = create.round(Number(val));
        return rounded;
      }
    });
  }
  if (!args['--chars']) {
    questions.push({
      name: 'chars',
      type: 'expand',
      message: 'What characters should be used?',
      choices: [
        {
          key: 'a',
          name: 'Alphabet (A-Za-z)',
          value: 'alpha'
        },
        {
          key: 'u',
          name: 'Uppercase (A-Z)',
          value: 'upper'
        },
        {
          key: 'l',
          name: 'Lowercase (a-z)',
          value: 'lower'
        },
        {
          key: 'n',
          name: 'Alphanumeric (A-Za-z0-9)',
          value: 'alphanum'
        },
        {
          key: 's',
          name: 'All Chars (A-Za-z0-9) and Special Characters',
          value: 'special'
        }
      ],
      default: 4
    });
  }

  const ans = await prompt(questions);

  const length = args['--length'] || ans.length;
  const chars = args['--chars'] || ans.chars;

  const password = create(length, chars);
  console.log(password);
  return password;
}

run(process.argv.slice(2));
