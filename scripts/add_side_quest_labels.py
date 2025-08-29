#!/usr/bin/env python3
"""
Add side-quest label to issues 79-83
"""

import subprocess
import json

# Issues that need the side-quest label
SIDE_QUEST_ISSUES = [79, 80, 81, 82, 83]

# Repository
REPO = "Studio-Dashosa/abstract-garden-video"

def run_gh_command(cmd):
    """Run a GitHub CLI command and return the result."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error: {result.stderr}")
            return None
        return result.stdout.strip()
    except Exception as e:
        print(f"Command failed: {e}")
        return None

def main():
    print("Adding side-quest labels to issues 79-83...")
    
    # First, create the side-quest label if it doesn't exist
    print("\n1. Creating side-quest label...")
    create_label = f'gh label create "side-quest" --repo {REPO} --color "FEF2C0" --description "Hidden legendary quests"'
    result = run_gh_command(create_label)
    if result:
        print("   ✓ Label created")
    else:
        print("   - Label may already exist")
    
    # Add label to each issue
    print("\n2. Adding labels to issues...")
    for issue_num in SIDE_QUEST_ISSUES:
        print(f"   Issue #{issue_num}:", end=" ")
        add_label = f'gh issue edit {issue_num} --repo {REPO} --add-label "side-quest"'
        result = run_gh_command(add_label)
        if result is not None:
            print("✓")
        else:
            print("✗ (may not exist or already labeled)")
    
    print("\n3. Verifying side quest issues...")
    # List all issues with side-quest label
    list_cmd = f'gh issue list --repo {REPO} --label "side-quest" --json number,title,state'
    result = run_gh_command(list_cmd)
    if result:
        side_quests = json.loads(result)
        print(f"   Found {len(side_quests)} side quest issues:")
        for sq in side_quests:
            status = "✓" if sq['state'] == 'CLOSED' else "○"
            print(f"   {status} #{sq['number']}: {sq['title']}")
    
    print("\nDone! Side quest labels have been added.")
    print("\nTo create the remaining 13 side quests, run:")
    print("python create_remaining_side_quests.py")

if __name__ == "__main__":
    main()
