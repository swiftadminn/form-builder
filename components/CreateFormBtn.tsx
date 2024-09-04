"use client";

import { ImSpinner2 } from "react-icons/im";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formSchemaType, formSchema } from "@/schemas/form";
import { CreateForm } from "@/app/actions/form";
import { toast } from "@/hooks/use-toast";
import { BsFileEarmarkPlus } from "react-icons/bs";

function CreateFormBtn() {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema)
    });

    async function handleSubmit(values: formSchemaType) {
        try {
         const formId = await CreateForm(values)
            toast({
                title: "Success",
                description: "Form created successfully",
            });
            console.log("FORM ID",formId)
        } catch (e) {
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background-"}>
                    <BsFileEarmarkPlus className={"h-8 w-8 text-muted-foreground group-hover:text-primary"}/>
                    <p className={"font-bold text-xl text-muted-foreground group-hover:text-primary"}>
                        Create new form
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Form</DialogTitle>
                    <DialogDescription>
                        Create a new form to start collecting responses
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={form.formState.isSubmitting} className={"w-full mt-4"}>
                                {!form.formState.isSubmitting && <span>Save</span>}
                                {form.formState.isSubmitting && (
                                    <ImSpinner2 className={"animate-spin"} />
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateFormBtn;
