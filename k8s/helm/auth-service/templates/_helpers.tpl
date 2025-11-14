{{- define "auth-service.name" -}}
auth-service
{{- end -}}

{{- define "auth-service.fullname" -}}
auth-service
{{- end -}}

{{- define "auth-service.chart" -}}
{{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}
