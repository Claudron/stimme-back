class DebugPrintMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Path:", request.path)
        print("Method:", request.method)

        if request.method == "PATCH":
            print("Patch Request Data:", request.body.decode("utf-8"))

        response = self.get_response(request)

        print("Response Status:", response.status_code)
        print("Response Content:", response.content)

        return response
