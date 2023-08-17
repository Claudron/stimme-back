import os
import re

def rename_file(filename):
    """
    Renames a given filename by reordering its parts and making specific replacements.
    
    Args:
        filename (str): The original filename.
        
    Returns:
        str: The renamed filename.
    """
    # Extract the file extension
    base_name, file_extension = os.path.splitext(filename)
    
    # Define the regex pattern to capture different parts of the filename
    pattern = re.compile(r'^(CT_)(.*?)_(C-[A-Z0-9]+)_(.*)$')
    match = pattern.search(base_name)
    
    # If the pattern matches, construct the renamed filename based on the matched groups
    if match:
        renamed_base = f"{match.group(1)}{match.group(3)}_{match.group(2)}_{match.group(4)}"
        if not renamed_base.endswith('_mid'):
            renamed_base += '_mid'
        return f"{renamed_base}{file_extension}"
    
    # If the pattern doesn't match, return the original filename
    return filename

# Test the refactored function once again
rename_file(test_filename)
