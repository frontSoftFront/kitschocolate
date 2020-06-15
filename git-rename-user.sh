#!/bin/bash

# bash script to rename git commit username

git filter-branch --commit-filter -f '
        if [ "$GIT_COMMITTER_NAME" = "VitaliyAndrushko" ];
        then
                GIT_COMMITTER_NAME="Vitaliy";
                GIT_AUTHOR_NAME="Vitaliy";
                GIT_COMMITTER_EMAIL="vitaliy@gmail.com";
                GIT_AUTHOR_EMAIL="vitaliy@gmail.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD