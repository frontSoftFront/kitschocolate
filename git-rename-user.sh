#!/bin/bash

# bash script to rename git commit user

git filter-branch --env-filter '
        OLD_EMAIL="vitaliy@gmail.com"
        CORRECT_NAME="Mars"
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


# git filter-branch --commit-filter '
#         if [ "$GIT_COMMITTER_EMAIL" = "vitalika1988@gmail.com" ];
#         then
#                 GIT_COMMITTER_NAME="Vitaliy";
#                 GIT_AUTHOR_NAME="Vitaliy";
#                 GIT_COMMITTER_EMAIL="vitaliy@gmail.com";
#                 GIT_AUTHOR_EMAIL="vitaliy@gmail.com";
#                 git commit-tree "$@";
#         else
#                 git commit-tree "$@";
#         fi' HEAD

# git filter-branch --force --commit-filter - use --force if backup exist
