import { useChatStore } from "@/store/useChatStore";
import { useRef, useState } from "react";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { sendMessage } = useChatStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  
  return (
    <div className="p-4 border-t border-slate-700/50">
      {/* Preview image */}
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full flex items-center justify-center"
              onClick={removeImage}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Form input */}
      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
        <Input
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-slate-700/50 rounded-lg py-2 px-4"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className={imagePreview ? "text-indigo-500" : ""}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>

        <Button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg px-4 py-2 font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
