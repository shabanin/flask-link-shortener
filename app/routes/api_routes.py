from app import app, db
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, Link
from flask import render_template, flash, redirect, url_for, request, jsonify


@app.route('/api/current_user', methods=['GET'])
def api_user_username():
    if current_user.is_authenticated:
        links = current_user.links.all()
        serialized_links = list(map(lambda link: link.serialized(), links))
        print(links)
        return jsonify({
            "authenticated": True,
            "username": current_user.username,
            "links": serialized_links
        })
    return jsonify({"authenticated": False})


@app.route('/api/create_link', methods=['GET'])
def api_create_link():
    original_link = request.args.get("original_link")
    if original_link is not None:
        link = Link(original_link=original_link)
        if current_user.is_authenticated:
            link.set_author(current_user)

        # additional commit to set link.id that is used to created shortened link
        db.session.add(link)
        db.session.commit()
        link.set_shortened_link()
        db.session.add(link)
        db.session.commit()
        return jsonify({"ok": True, "link": link.serialized()})
    return jsonify({"ok": False})


@app.route('/api/remove_link', methods=['GET'])
def api_remove_link():
    shortened_link = request.args.get("shortened_link")
    if shortened_link is not None:
        link = Link.query.filter_by(shortened_link=shortened_link).first()
        if link.user_id == current_user.id:
            db.session.delete(link)
            db.session.commit()
            return jsonify({"success": True})
    return jsonify({"success": False})


