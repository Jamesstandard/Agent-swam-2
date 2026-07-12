package com.aistudio.multimetamatrix.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun AgentBuilderScreen() {
    var agentName by remember { mutableStateOf("") }
    var role by remember { mutableStateOf("") }
    var tasks by remember { mutableStateOf("") }
    var skills by remember { mutableStateOf("") }
    var tools by remember { mutableStateOf("") }
    var llmModel by remember { mutableStateOf("Gemini 1.5 Flash") }
    var autonomous by remember { mutableStateOf(true) }
    var rmiEndpoint by remember { mutableStateOf("") }
    var rmiMethod by remember { mutableStateOf("") }
    var rmiCredentials by remember { mutableStateOf("") }

    LazyColumn(modifier = Modifier.padding(16.dp)) {
        item {
            Text("Agent Builder", style = MaterialTheme.typography.headlineMedium)
            Spacer(modifier = Modifier.height(16.dp))
            
            OutlinedTextField(
                value = agentName,
                onValueChange = { agentName = it },
                label = { Text("Agent Name") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = role,
                onValueChange = { role = it },
                label = { Text("Role") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = tasks,
                onValueChange = { tasks = it },
                label = { Text("Tasks") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = skills,
                onValueChange = { skills = it },
                label = { Text("Skills") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = tools,
                onValueChange = { tools = it },
                label = { Text("Tools") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(16.dp))
            
            Text("LLM Selection", style = MaterialTheme.typography.titleSmall)
            // Simplified radio buttons for LLM
            Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
                RadioButton(selected = llmModel == "Gemini 1.5 Flash", onClick = { llmModel = "Gemini 1.5 Flash" })
                Text("Gemini 1.5 Flash")
            }
            Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
                RadioButton(selected = llmModel == "Gemini 1.5 Pro", onClick = { llmModel = "Gemini 1.5 Pro" })
                Text("Gemini 1.5 Pro")
            }
            
            Spacer(modifier = Modifier.height(16.dp))
            
            Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
                Text("Autonomous Capabilities")
                Spacer(modifier = Modifier.weight(1f))
                Switch(checked = autonomous, onCheckedChange = { autonomous = it })
            }

            Spacer(modifier = Modifier.height(16.dp))
            Text("RMI Configuration", style = MaterialTheme.typography.titleSmall)
            OutlinedTextField(
                value = rmiEndpoint,
                onValueChange = { rmiEndpoint = it },
                label = { Text("RMI Endpoint") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = rmiMethod,
                onValueChange = { rmiMethod = it },
                label = { Text("RMI Method") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = rmiCredentials,
                onValueChange = { rmiCredentials = it },
                label = { Text("RMI Credentials") },
                modifier = Modifier.fillMaxWidth()
            )
            
            Spacer(modifier = Modifier.height(24.dp))
            Button(
                onClick = { /* TODO: Deploy agent */ },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Deploy Agent")
            }
        }
    }
}
