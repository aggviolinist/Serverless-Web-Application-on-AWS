# Dynamic Site Hosting on AWS
## 1. Network Setup
### NAT Gateway
- Create a NAT Gateway in a public subnet.
- Link the NAT Gateway to the Private Route Table.
💡 This enables outbound internet access for resources in private subnets (e.g., web servers and databases) without exposing them publicly.

### 2. Security Groups
Create and configure the following security groups to control network access between components:
 ```sh
  EC2 Instance Connect Endpoint (EC2 Connect)
   - Inbound: None required
   - Outbound: VPC CIDR block

💡Used to SSH into EC2 instances without needing a Bastion Host.
 ```
 ```sh
 Application Load Balancer (ALB)
 - Inbound:
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
 - Outbound: 0.0.0.0/0
💡 Routes traffic from the internet to web servers.

 ```
 ```sh
 - Web Server
  - Inbound: From ALB (for HTTP/HTTPS traffic), From EC2 Connect Endpoint (for SSH access)
  - Outbound: 0.0.0.0/0
💡 Hosts your application code and communicates with RDS for dynamic data.
```
```sh
 Data Migration Service (DMS)
 - Inbound: EC2 Connect Endpoint
 - Outbound: 0.0.0.0/0
💡 Used for migrating data to the EC2 instance (e.g., from on-prem or other sources).
```
```sh
 RDS (Database)
 - Inbound: From Web Server (MySQL port, e.g., 3306), From EC2 Connect Endpoint (for admin access)
 - Outbound: General (VPC internal / 0.0.0.0/0)
💡 Stores your dynamic site’s MySQL data.
```

### 3. EC2 Instance Connect Endpoint
In the VPC Console, under Private Connections, create an EC2 Instance Connect Endpoint.

💡This enables secure SSH access to private EC2 instances without exposing port 22 publicly or using a Bastion Host.

### 4. Storage (S3)
Create an S3 bucket ```sh aws s3 mb s3://dev-app-webfile```

Upload both: Web application files (e.g., HTML, CSS, PHP, SQL) 
```sh
aws s3 cp ./nest.zip s3://dev-app-webfile/
aws s3 cp ./V1__nest.sql  s3://dev-app-webfile/
aws s3 cp ./NestAppServiceProvider.php s3://dev-app-webfile/

 ```
Big files are not accepted on git so clear them from git
```sh
git filter-repo --path "Project 2 Dynamic site/nest.zip" --invert-paths
git push origin main --force
```
### 5.