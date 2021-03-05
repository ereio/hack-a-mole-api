# https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean

# 1) apply ingress-nginx 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/do/deploy.yaml

# 2) apply cert-manager
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.2.0/cert-manager.yaml