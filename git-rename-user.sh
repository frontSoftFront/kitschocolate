#!/bin/bash

# bash script to rename git commit username

git filter-branch --force --commit-filter '
        if [ "$GIT_COMMITTER_EMAIL" = "vitalika1988@gmail.com" ];
        then
                GIT_COMMITTER_NAME="Vitaliy";
                GIT_AUTHOR_NAME="Vitaliy";
                GIT_COMMITTER_EMAIL="vitaliy@gmail.com";
                GIT_AUTHOR_EMAIL="vitaliy@gmail.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
