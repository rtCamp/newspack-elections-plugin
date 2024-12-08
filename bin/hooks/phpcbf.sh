#!/bin/sh

function run_phpcbf(){

    echo "Checking against PHPCS Standard for issues fixable by PHPCBF";

	FILES=$(git diff --cached --name-only --diff-filter=ACMR HEAD | grep .php)

    ./vendor/bin/phpcbf . --filter=GitStaged
    
    # Re-Add File to the repo once they've been passed through CBF
    # It's okay to use --force here, anything in the $FILES list was already in the repository so respect that choice
    git add --force $FILES
}

run_phpcbf