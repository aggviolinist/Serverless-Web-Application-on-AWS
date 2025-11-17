resource "aws_db_subnet_group" "three_tier_app_subnet_group" {
    name = "three-tier-app-subnet-group"
    subnet_ids = [var.private_subnets[2],var.private_subnets[3]]

    tags = {
         Name = "${var.project_name}-subnet-group"
    }
}

resource "aws_db_instance" "three_tier_rds_database" {
    db_name = "three_tier_db"
    instance_class = var.instance_class
    engine = "mysql"
    engine_version = "8.4.7"
    skip_final_snapshot = true
}