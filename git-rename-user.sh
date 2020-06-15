#!/bin/bash

# bash script to rename git commit user

git filter-branch --force --env-filter '
        OLD_EMAIL1="vitalika1988@gmail.com"
        CORRECT_NAME1="VitaliyAndrushko"
        CORRECT_EMAIL1="vitalika1988@gmail.com"
        OLD_EMAIL2="front.soft.front@gmail.com"
        CORRECT_NAME2="Admin"
        CORRECT_EMAIL2="front.soft.front@gmail.com"
        if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
        then
            export GIT_COMMITTER_NAME="$CORRECT_NAME"
            export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
        fi
        if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
        then
            export GIT_AUTHOR_NAME="$CORRECT_NAME"
            export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
        fi
        if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL2" ]
        then
            export GIT_AUTHOR_NAME="$CORRECT_NAME2"
            export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL2"
        fi
        if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL2" ]
        then
            export GIT_AUTHOR_NAME="$CORRECT_NAME2"
            export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL2"
        fi
' --tag-name-filter cat -- --branches --tags

# git filter-branch --force use --force if backup exist
