from graphviz import Digraph

# Create the diagram
diagram = Digraph("WebAppArchitecture", format='png')
diagram.attr(rankdir='LR', layout='dot')

# Set font and node shape
diagram.attr('node', shape='rect', style='filled', fontname='Helvetica', fontsize='10', fillcolor='lightgrey')

# Nodes with AWS service icons and labels
aws_icons = {
    "User": "User",
    "CloudFront": "Amazon CloudFront",
    "S3": "Amazon S3 (Private Bucket)",
    "ReactApp": "React Static Files",
    "API Gateway": "Amazon API Gateway",
    "Cognito": "Amazon Cognito",
    "Lambda": "AWS Lambda\n(GET, POST, PUT, DELETE)",
    "DynamoDB": "Amazon DynamoDB",
    "Postman": "Postman (API Testing)",
}

for key, label in aws_icons.items():
    diagram.node(key, label)

# User interaction flow
diagram.edge("User", "CloudFront", label="Access React App")
diagram.edge("CloudFront", "S3", label="Fetch Static Files")
diagram.edge("User", "Cognito", label="Login / JWT Token")

# API Gateway interaction
diagram.edge("User", "API Gateway", label="API Requests\n(with JWT)", style='dashed')
diagram.edge("Postman", "API Gateway", label="Test API")

# Cognito JWT auth validation
diagram.edge("API Gateway", "Cognito", label="JWT Validation", style="dotted")

# Lambda connection
diagram.edge("API Gateway", "Lambda", label="Invoke Function")
diagram.edge("Lambda", "DynamoDB", label="CRUD Operations")

# Connecting API Gateway to CloudFront for routing
diagram.edge("CloudFront", "API Gateway", label="API Route Forwarding")

# Output
diagram.render(filename='aws_web_app_architecture', cleanup=False)
