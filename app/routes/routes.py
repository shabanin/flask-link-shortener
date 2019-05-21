from app import app, db
from flask import render_template, flash, redirect, url_for, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from app.models import Link
from app.routes import user_routes, api_routes

@app.route('/')
def index():
    return render_template('index.html', title='Link shortener', is_static=False)


@app.route('/stats')
@login_required
def stats():
    return render_template('index.html', title='Stats', is_static=False)


@app.route('/<short_url>')
def short_link(short_url):
    link = Link.query.filter_by(shortened_link=short_url).first_or_404()
    link.add_click()
    db.session.commit()
    return redirect(link.original_link)

