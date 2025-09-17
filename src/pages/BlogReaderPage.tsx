import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOGS } from '@/lib/content';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStudent } from '@/contexts/StudentContext';
import { useToast } from '@/hooks/use-toast';
import { XP_REWARDS } from '@/lib/content';

const BlogReaderPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const blog = BLOGS.find(b => b.id === blogId);
  const { addXP } = useStudent();
  const { toast } = useToast();
  const [completedContent, setCompletedContent] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedContent');
    if (saved) setCompletedContent(JSON.parse(saved));
  }, [blogId]);

  const isCompleted = blog ? completedContent.includes(blog.id) : false;

  const markAsRead = () => {
    if (!blog) return;
    if (isCompleted) return;
    const updated = [...completedContent, blog.id];
    setCompletedContent(updated);
    localStorage.setItem('completedContent', JSON.stringify(updated));
    addXP(XP_REWARDS.BLOG_READ);
    toast({ title: 'Marked as read', description: `You earned ${XP_REWARDS.BLOG_READ} XP.` });
  };

  if (!blog) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-xl font-semibold mb-4">Blog not found</div>
        <Button onClick={() => navigate('/student/learning')}>Back to Learning</Button>
      </div>
    );
  }

  const blogsInCategory = BLOGS.filter(b => b.category === blog.category);
  const index = blogsInCategory.findIndex(b => b.id === blog.id);
  const prev = blogsInCategory[index - 1];
  const next = blogsInCategory[index + 1];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border p-4 sticky top-0 h-screen overflow-y-auto hidden md:block">
        <div className="text-sm font-semibold mb-2">{blog.category} Articles</div>
        <div className="space-y-1">
          {blogsInCategory.map(b => (
            <button
              key={b.id}
              className={`w-full text-left px-2 py-1.5 rounded hover:bg-muted ${b.id === blog.id ? 'bg-muted font-medium' : ''}`}
              onClick={() => navigate(`/student/learning/blogs/${b.id}`)}
            >
              {b.title}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={() => navigate('/student/learning')}>← Back</Button>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">Read time: {blog.readTime} min</div>
              <Button size="sm" variant={isCompleted ? 'secondary' : 'default'} onClick={markAsRead} disabled={isCompleted}>
                {isCompleted ? 'Completed' : `Mark as Read +${XP_REWARDS.BLOG_READ} XP`}
              </Button>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="text-sm text-muted-foreground mb-4">By {blog.author} · {blog.category}</div>

          {blog.thumbnailUrl && (
            <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-60 object-cover rounded mb-6" />
          )}

          <Card className="p-6 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: (window as any).marked ? (window as any).marked.parse(blog.content) : blog.content.replace(/\n/g, '<br/>') }} />

          <div className="flex items-center justify-between mt-6">
            <Button variant="secondary" disabled={!prev} onClick={() => prev && navigate(`/student/learning/blogs/${prev.id}`)}>← Previous</Button>
            <Button variant="secondary" disabled={!next} onClick={() => next && navigate(`/student/learning/blogs/${next.id}`)}>Next →</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogReaderPage;


