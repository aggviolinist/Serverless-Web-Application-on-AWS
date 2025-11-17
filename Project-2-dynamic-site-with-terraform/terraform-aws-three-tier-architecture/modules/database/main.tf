#subnet group
resource "aws_db_subnet_group" "three_tier_app_subnet_group" {
  name       = "three-tier-app-subnet-group"
  subnet_ids = [var.private_subnets[2], var.private_subnets[3]]

  tags = {
    Name = "${var.project_name}-subnet-group"
  }
}

#secrets manager
resource "aws_secretsmanager_secret" "rds_secret" {
    name = "${var.project_name}-rds-secret" 
}

resource "aws_secretsmanager_secret_version" "rds_secret_version" {
    secret_id = aws_secretsmanager_secret.rds_secret.id
    secret_string = jsonencode(
        {
            username = var.db_username
            password = var.db_password
        }
    )
  
}

#rds
resource "aws_db_instance" "three_tier_rds_database" {
  identifier           = "${var.project_name}-db"
  db_name              = var.db_name
  instance_class       = var.instance_class
  engine               = var.engine
  engine_version       = var.engine_version
  allocated_storage     = 20
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.three_tier_app_subnet_group.name
  vpc_security_group_ids = [ var.rds_sg_id ]
  storage_encrypted    = true
  publicly_accessible  = false
  multi_az = false
  port                 = 3306
  username = var.db_username
  password = var.db_password

}