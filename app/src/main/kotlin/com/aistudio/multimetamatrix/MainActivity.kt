package com.aistudio.multimetamatrix

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.aistudio.multimetamatrix.ui.theme.MultiMetaMatrixTheme
import com.aistudio.multimetamatrix.ui.screens.HomeScreen
import com.aistudio.multimetamatrix.ui.screens.AgentBuilderScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MultiMetaMatrixTheme {
                var currentScreen by remember { mutableStateOf("Home") }
                
                Surface(modifier = Modifier.fillMaxSize()) {
                    Column {
                        Row(modifier = Modifier.fillMaxWidth().padding(8.dp)) {
                            Button(onClick = { currentScreen = "Home" }) { Text("Home") }
                            Spacer(modifier = Modifier.width(8.dp))
                            Button(onClick = { currentScreen = "Builder" }) { Text("Agent Builder") }
                        }
                        
                        when (currentScreen) {
                            "Home" -> HomeScreen()
                            "Builder" -> AgentBuilderScreen()
                        }
                    }
                }
            }
        }
    }
}
