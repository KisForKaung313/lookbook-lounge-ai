import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddOutfitToBoard, useBoards, useSaveBoard } from "@/lib/data";

export function SaveToBoardDialog({
  outfitId,
  open,
  onOpenChange,
}: {
  outfitId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: boards } = useBoards();
  const addToBoard = useAddOutfitToBoard();
  const saveBoard = useSaveBoard();
  const [newName, setNewName] = useState("");

  async function add(boardId: string) {
    if (!outfitId) return;
    try {
      await addToBoard.mutateAsync({ boardId, outfitId });
      toast.success("Added to your board.");
      onOpenChange(false);
    } catch {
      toast.error("We couldn't add that to the board. Please try again.");
    }
  }

  async function createAndAdd() {
    if (!newName.trim()) return;
    try {
      const boardId = await saveBoard.mutateAsync({ name: newName.trim() });
      setNewName("");
      await add(boardId);
    } catch {
      toast.error("We couldn't create that board. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Add to a board</DialogTitle>
          <DialogDescription>Keep looks you love together.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {boards?.length ? (
            boards.map((board) => (
              <button
                key={board.id}
                type="button"
                onClick={() => void add(board.id)}
                className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
              >
                {board.name}
                <span className="text-xs text-muted-foreground">Add</span>
              </button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              You don't have any boards yet. Create your first one below.
            </p>
          )}
        </div>

        <div className="flex gap-2 border-t border-border pt-4">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New board name"
            aria-label="New board name"
          />
          <Button onClick={() => void createAndAdd()} disabled={!newName.trim()}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
