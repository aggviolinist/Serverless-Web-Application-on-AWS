output "eice_sg_id" {
  description = "This is the EC2 Instance security group"
  value       = aws_security_group.eice_ssh_sg.id
}

output "web_server_sg_id" {
  description = "This is the security group of web server"
  value       = aws_security_group.web_server_sg.id
}