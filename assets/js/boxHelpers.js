function parse_ascii_keyfile(data) {
    // Our data begins at the first character index preceded by a blank line.
    var body_begin_index	= data.search(/^(\r\n|\n|\r)/m) + 1;

    // Our data ends right before the checksum line which starts with an "="
    var body_end_index		= data.search(/^\=/m);

    // Both of these indexes need to exist for the file to be readable.
    if (body_begin_index == -1 || body_end_index == -1)	{
        alert('This is not a valid ASCII-Armored OpenPGP export file.');
        return false;
    }

    // Pull the body out of the data and strip all newlines from it
    var body		= data.substring(body_begin_index, body_end_index);
    var body		= body.replace(/(\r\n|\n|\r)/gm, '');
    var decoded     = atob(body);
    return decoded;
    // Grab the checksum while we're at it...
    //var body_checksum	= data.substr(body_end_index + 1, 4);
    
    
}
