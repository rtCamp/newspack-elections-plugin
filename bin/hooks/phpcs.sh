#!/bin/sh

function run_phpcs(){
    echo "Checking coding standards"
    
    ./vendor/bin/phpcs . --filter=GitStaged

    if [ $? != 0 ]; then
        echo "There are errors that needs to be corrected prior to the commit."
        exit 1
    fi
}

run_phpcs 