#! python
#
# routes.py <= main
from app.main import bp
from flask import flash
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import Response
from flask import request
from flask import url_for
import tempfile


@bp.route('/')
@bp.route('/index')
def index():

    return render_template('index.html', tite='Home')


# ------------- #
# Get Form File #
# ------------- #
# Using just python to get a form, turn it into a file (buffer) and return it
# to the client for download
@bp.route('/getformfile', methods=['POST'])
def getformfile():
    print(request.values)
    filename = request.form['filenameinput']
    filecontents = request.form['filecontentstextarea']
    savefile = request.form.get('savetostaticcheckbox')
    print(f"[*] File name: {filename}\n")
    print(f"[*] File contents: {filecontents}\n")
    if savefile:
        print(f"[*] Save file?  {savefile}\n")
        flash(u'The file has been saved', 'success')
        return redirect(url_for('main.index'))
    else:
        print(f"[+] File to be downloaded: {filename}\n")
        return Response(
            filecontents,
            mimetype="text/plain",
            headers={"Content-Disposition":
                     "attachment; filename={}".format(filename)}
        )

    return redirect(url_for('main.index'))


@bp.route('/jsformfile', methods=['POST'])
def jsformfile():
    print(request.values)
    # Get the form contents
    filename = request.form['jsfilenameinput']
    filecontents = request.form['jsfilecontentstextarea']
    print(f"[*] File name: {filename}\n")
    print(f"[*] File contents: {filecontents}\n")
    print(f"[+] File to be downloaded: {filename}\n")
    return Response(
        filecontents,
        mimetype="text/plain",
        headers={"Content-Disposition":
                 "attachment; filename={}".format(filename)}
    )
