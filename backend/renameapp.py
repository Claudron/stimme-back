import os
import shutil

def rename_django_app(old_app_name, new_app_name, project_path):
    # Step 1: Rename the app folder
    old_app_path = os.path.join(project_path, old_app_name)
    new_app_path = os.path.join(project_path, new_app_name)
    os.rename(old_app_path, new_app_path)
    
    # Step 2: Update references in Python files
    for root, _, files in os.walk(project_path):
        for file_name in files:
            if file_name.endswith('.py'):
                file_path = os.path.join(root, file_name)
                with open(file_path, 'r') as file:
                    content = file.read()

                # Replace old app name with new app name
                new_content = content.replace(old_app_name, new_app_name)

                # Write changes back to the file
                with open(file_path, 'w') as file:
                    file.write(new_content)

    # Step 3: Rename static and template folders if namespaced
    for folder in ['static', 'templates']:
        old_path = os.path.join(new_app_path, folder, old_app_name)
        new_path = os.path.join(new_app_path, folder, new_app_name)
        if os.path.exists(old_path):
            os.rename(old_path, new_path)

    # Step 4: Update apps.py
    apps_file_path = os.path.join(new_app_path, 'apps.py')
    if os.path.exists(apps_file_path):
        with open(apps_file_path, 'r') as file:
            content = file.read()
        
        # Replace old app name with new app name in class and attribute
        new_content = content.replace(f"{old_app_name}Config", f"{new_app_name}Config").replace(f"name = '{old_app_name}'", f"name = '{new_app_name}'")

        with open(apps_file_path, 'w') as file:
            file.write(new_content)

    # Step 5: Remove __pycache__ folder
    pycache_path = os.path.join(new_app_path, '__pycache__')
    if os.path.exists(pycache_path):
        shutil.rmtree(pycache_path)

    print(f"Renamed {old_app_name} to {new_app_name}. Please manually update the database.")

# Usage example
project_path = '/Users/claudio/code/web/base-v1'
old_app_name = 'core'
new_app_name = 'core'
rename_django_app(old_app_name, new_app_name, project_path)
