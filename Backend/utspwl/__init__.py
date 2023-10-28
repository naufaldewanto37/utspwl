from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid_jwt.policy import JWTAuthenticationPolicy


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_jwt')
    config.include('pyramid_jinja2')
    config.add_static_view('static', 'static', cache_max_age=3600)

    authn_policy = JWTAuthenticationPolicy(
        'qwert123', http_header='Authorization')
    authz_policy = ACLAuthorizationPolicy()

    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)

    config.add_route('home', '/home')
    config.add_route('get_products', '/product', request_method='GET')
    config.add_route('get_products_specific', '/product/{id}', request_method='GET')
    config.add_route('add_product', '/product', request_method='POST')
    config.add_route('delete_product', '/product/{id}', request_method='DELETE')
    config.add_route('update_product', '/product/{id}', request_method='PUT')
    config.add_route('purchase_product', '/purchase_product/{id}')

    config.scan('.views')
    return config.make_wsgi_app()
