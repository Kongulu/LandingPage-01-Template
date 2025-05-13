import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  inputFormat: z.string().min(1, "Please select an input format"),
  outputFormat: z.string().min(1, "Please select an output format"),
  bookmarks: z.string().min(1, "Please paste your bookmarks"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookmarkConverter() {
  const [convertedBookmarks, setConvertedBookmarks] = useState<string | null>(null);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputFormat: "",
      outputFormat: "",
      bookmarks: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch("/api/convert-bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Conversion failed");
      }
      
      const result = await response.json();
      setConvertedBookmarks(result.convertedBookmarks);
      
      toast({
        title: "Conversion successful",
        description: "Your bookmarks have been converted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Conversion failed",
        description: "There was an error converting your bookmarks. Please try again.",
      });
    }
  }

  function downloadBookmarks() {
    if (!convertedBookmarks) return;
    
    const outputFormat = form.getValues("outputFormat");
    const extension = outputFormat === "html" ? "html" : "json";
    const blob = new Blob([convertedBookmarks], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookmarks.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Bookmark Converter</CardTitle>
          <CardDescription>
            Convert your bookmarks between different browser formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="inputFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Format</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select input format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="chrome">Chrome</SelectItem>
                          <SelectItem value="firefox">Firefox</SelectItem>
                          <SelectItem value="safari">Safari</SelectItem>
                          <SelectItem value="edge">Edge</SelectItem>
                          <SelectItem value="opera">Opera</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="outputFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Output Format</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select output format" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="chrome">Chrome</SelectItem>
                          <SelectItem value="firefox">Firefox</SelectItem>
                          <SelectItem value="safari">Safari</SelectItem>
                          <SelectItem value="edge">Edge</SelectItem>
                          <SelectItem value="opera">Opera</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="bookmarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Your Bookmarks</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste your bookmarks here" 
                        className="min-h-[200px]" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-primary" size="lg">
                  <Upload className="mr-2 h-4 w-4" />
                  Convert Bookmarks
                </Button>
              </div>
            </form>
          </Form>
          
          {convertedBookmarks && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Converted Bookmarks</h3>
              <div className="relative">
                <Textarea 
                  readOnly 
                  value={convertedBookmarks} 
                  className="min-h-[200px] font-mono text-sm"
                />
                <Button 
                  onClick={downloadBookmarks}
                  className="absolute bottom-4 right-4"
                  variant="secondary"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <Alert variant="info" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Privacy Notice</AlertTitle>
            <AlertDescription>
              Your bookmarks are processed entirely in your browser. No data is stored on our servers.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}