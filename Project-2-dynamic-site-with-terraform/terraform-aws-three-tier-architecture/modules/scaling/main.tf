# data "aws_ami" "three_tier_asg_ami" {
#   most_recent = true
#   owners      = ["amazon"]

#   filter {
#     name   = "name"
#     values = ["al2023-ami-*-x86_64"]
#   }
# }

resource "aws_launch_template" "three_tier_launch_template" {
  name_prefix = "${var.project_name}-launch-template"
  image_id      = var.ami
  instance_type = var.instance_type
  vpc_security_group_ids = [ var.web_server_sg_id ]
  iam_instance_profile {
    name = var.ec2instance_three_tier_instance_profile
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "${var.project_name}-asg-instance"
    }
  }
  monitoring {
    enabled = true
  }
  
}

resource "aws_autoscaling_group" "three_tier_asg" {
  name = "${var.project_name}-asg"
  desired_capacity   = 2
  max_size           = 4
  min_size           = 1
  health_check_type = "ELB"
  health_check_grace_period = 300
  vpc_zone_identifier = var.private_subnets
  target_group_arns = [aws_launch_template.three_tier_launch_template.arn]

  launch_template {
    id      = aws_launch_template.three_tier_launch_template.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
    preferences {
      min_healthy_percentage = 50
    }
    triggers = ["tag"]
  }
  tag {
    key                 = "Name"
    value               = "${var.project_name}-asg-instance"
    propagate_at_launch = true
  }

  tag {
    key                 = "Environment"
    value               = "dev"
    propagate_at_launch = true
  }
   # Wait for instances to be healthy before considering deployment complete
  lifecycle {
    create_before_destroy = true
  }
}
