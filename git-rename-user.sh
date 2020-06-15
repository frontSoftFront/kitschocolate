#!/bin/bash

# bash script to rename git commit user

git filter-branch --force --env-filter '
        OLD_EMAIL="vitalika1988@gmail.com"
        CORRECT_NAME="Vitalika1988"
        CORRECT_EMAIL="vitalika1988@gmail.com"
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
' --tag-name-filter cat -- --branches --tags

# git filter-branch --force use --force if backup exist
