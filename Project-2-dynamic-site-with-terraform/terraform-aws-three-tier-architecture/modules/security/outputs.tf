output "eice_sg_id" {
  description = "This is the EC2 Instance security group"
  value       = aws_security_group.eice_ssh_sg.id
}