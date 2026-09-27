pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'reports/**,custom-report/**,allure-results/**',
                allowEmptyArchive: true
            )

            junit(
                testResults: 'reports/results.xml',
                allowEmptyResults: true
            )

            allure(
                includeProperties: false,
                results: [[path: 'allure-results']]
            )

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'custom-report',
                reportFiles: '*.html',
                reportName: 'Custom Test Report'
            ])

            emailext(
                subject: "Jenkins Build: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
                    <h2>Playwright Test Execution Report</h2>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Test Suite:</b> ${params.TEST_SUITE}</p>
                    <p><b>Browser:</b> ${params.BROWSER}</p>
                    <p>
                        <a href="${env.BUILD_URL}">Open Jenkins Build</a> |
                        <a href="${env.BUILD_URL}Playwright_20HTML_20Report">Open Playwright HTML Report</a> |
                        <a href="${env.BUILD_URL}Custom_20Test_20Report">Open Custom Report</a>
                    </p>
                """,
                to: "RECIVER_EMAIL_ADDRESS",
                from: "SENDER_EMAIL_ADDRESS",
                replyTo: "RECIVER_EMAIL_ADDRESS",
                mimeType: "text/html"
            )
        }

        success {
            script {
                powershell 'Remove-Item -Recurse -Force allure-results'
            }
        }
    }
}